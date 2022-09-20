import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, filter, first, fromEvent, map, merge, Observable, of, pairwise, shareReplay, Subject, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { DrawPageGetDTO } from 'src/app/DTOs/Draw/DrawPageGetDTO';
import { DrawingService } from './drawing.service';
import { v4 as guid } from 'uuid';
import { DrawPageCreateDTO } from 'src/app/DTOs/Draw/DrawPageCreateDTO';
import { DrawPageEditDTO } from 'src/app/DTOs/Draw/DrawPageEditDTO';
import { MatDialog } from '@angular/material/dialog';
import { DrawDeleteConfirmComponent } from '../draw-delete-confirm/draw-delete-confirm.component';
import { FormControl } from '@angular/forms';
import { DrawDrawingDTO } from 'src/app/DTOs/Draw/DrawDrawingDTO';
import { DrawCanvasType, getDrawCanvasColors, getDrawCanvasTypeWithIcons } from 'src/app/DTOs/Enums/DrawCanvasType';
import { DrawCanvasStorageDTO } from 'src/app/DTOs/Draw/DrawCanvasStorageDTO';
import { getCanvasStandardColor, getDistanceBetweenSegments } from 'src/app/Framework/Helpers/CanvasHelper';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnDestroy {

  private destroyed$ = new Subject<void>();
  private reloaded$ = new Subject<void>();
  private CANVAS_SIZE = 600;

  collectionId: string;

  pageId$ = new BehaviorSubject<string | undefined>(undefined);
  info$: Observable<DrawDrawingDTO>;
  editMode$: Observable<boolean>;

  formControlEditMode = new FormControl(false);
  formControlMode = new FormControl('Draw');
  formControlColor = new FormControl(getCanvasStandardColor());
  
  colors = getDrawCanvasColors();
  modes = getDrawCanvasTypeWithIcons();

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;
  canvasContext: CanvasRenderingContext2D | null = null;
  previousPage: string | undefined = undefined;
  previousEditmode: boolean | null = null;
  modeLinePreviousPoint: Event | null = null;
  modeLineLastEndedPoint: Event | null = null;
  eraseSegmentsBuffer: DrawCanvasStorageDTO[] = [];
  activeTextareaId: string | null = null;
  activeTextareaTop: number | null = null;
  activeTextareaLeft: number | null = null;
  setupDone = false;

  canvasStorage: DrawCanvasStorageDTO[] = [];
  currentStepperPoint: Date = new Date();

  constructor(
    private drawingService: DrawingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.collectionId = this.activatedRoute.snapshot.paramMap.get(appRoutes.DrawCollectionId) ?? '';
    this.pageId$.next(this.activatedRoute.snapshot.paramMap.get(appRoutes.DrawPageId) ?? '');

    this.editMode$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.has(appRoutes.Edit))
    );
    this.editMode$.subscribe(editMode => this.formControlEditMode.patchValue(editMode));

    this.info$ = this.editMode$.pipe(
      switchMap(editMode => this.drawingService.getPages$(this.collectionId, editMode)),
      takeUntil(this.destroyed$),
    );
    this.info$.subscribe();
    
    this.info$.pipe(
      first(),
      switchMap(_ => {
        if (!!this.formControlEditMode.value) {
          return this.drawingService.getSegments$(this.pageId$.value!);
        }
        return of(null);
      })
    ).subscribe(storage => {
      if (!!this.formControlEditMode.value && !!storage) {
        this.canvasStorage = storage.segments ?? [];
        this.currentStepperPoint = storage.stepperPosition;
      }
      this.canvasSetup();
    });

    this.info$.pipe(
      filter(_ => !!this.formControlEditMode.value),
      filter(info => !!info.changedBy),
      switchMap(_ => this.drawingService.getSegments$(this.pageId$.value!)),
    ).subscribe(storage => {
      this.canvasStorage = storage.segments ?? [];
      this.currentStepperPoint = storage.stepperPosition;
      this.canvasRestoreStorage();
    });

    combineLatest([
      this.info$,
      this.editMode$,
      this.pageId$.asObservable(),
    ]).pipe(
      tap(_ => {
        if (!this.canvasContext || !this.canvas?.nativeElement) {
          this.canvasSetup();
        }
      }),
      filter(_ => !!this.canvasContext && !!this.canvas?.nativeElement),
      filter(([_, editMode, pageId]) => !editMode || this.previousPage !== pageId || this.previousEditmode !== editMode),
      tap(([_, editMode, pageId]) => {
        this.previousPage = pageId;
        this.previousEditmode = editMode;
      }),
      map(([info, _, pageId]) => info.pages.filter(page => page.pageId === pageId).length === 0 ? undefined : info.pages.filter(page => page.pageId === pageId)[0].dataUrl),
      tap(dataUrl => this.canvasSetImage(dataUrl ?? '')),
      switchMap(_ => {
        if (!!this.formControlEditMode.value) {
          return this.drawingService.getSegments$(this.pageId$.value!);
        }
        return of(null);
      })
    ).subscribe(segments => {
      if (!!this.formControlEditMode.value && !!segments) {
        this.canvasStorage = segments.segments ?? [];
        this.currentStepperPoint = segments.stepperPosition;
        this.canvasRestoreStorage();
      }
    });
  }

  canvasSetup() {
    const canvas = this.canvas?.nativeElement;
    if (canvas) {
      this.canvasContext = canvas.getContext('2d');
      canvas.width = this.CANVAS_SIZE;
      canvas.height = this.CANVAS_SIZE;
      const white = getComputedStyle(document.documentElement).getPropertyValue('--learnz-light-white');
      const black = getComputedStyle(document.documentElement).getPropertyValue('--learnz-light-black');
      this.canvasContext!.lineWidth = 1;
      this.canvasContext!.lineCap = 'round';
      this.canvasContext!.fillStyle = white;
      this.canvasContext!.fillRect(0, 0, canvas.width, canvas.height);
      this.canvasContext!.strokeStyle = black;
      this.canvasDraw(canvas);
      this.canvasRestoreStorage();
    }
    if (!this.setupDone) {
      this.pageId$.next(this.pageId$.value);
      this.setupDone = true;
    }
  }

  canvasDraw(canvas: HTMLCanvasElement) {
    this.reloaded$.next();
    this.reloaded$.complete();
    this.reloaded$ = new Subject<void>();

    const mouseDown$ = fromEvent(canvas, 'mousedown').pipe(
      takeUntil(this.reloaded$),
      takeUntil(this.destroyed$)
    );

    const draw$ = mouseDown$.pipe(
      filter(_ => this.formControlMode.value === 'Draw'),
      switchMap(_ => {
        return fromEvent(canvas, 'mousemove').pipe(
          takeUntil(fromEvent(canvas, 'mouseup')),
          takeUntil(fromEvent(canvas, 'mouseleave')),
          pairwise(),
        );
      }),
      map(res => this.canvasMapPoints(canvas.getBoundingClientRect(), res)),
      shareReplay(1),
    );
    draw$.subscribe(positions => {
      this.canvasDrawOnMove(positions);
    });

    const line$ = mouseDown$.pipe(
      filter(_ => this.formControlMode.value === 'Line'),
      filter(point => {
        if (!this.modeLinePreviousPoint) {
          if (!this.modeLineLastEndedPoint) {
            this.modeLinePreviousPoint = point;
          } else {
            const positions = this.canvasMapPoints(canvas.getBoundingClientRect(), [this.modeLineLastEndedPoint, point]);
            if (positions.fromPosition.x !== positions.toPosition?.x || positions.fromPosition.y !== positions.toPosition?.y) {
              this.modeLinePreviousPoint = point;
            }
          }
          return false;
        }
        return true;
      }),
      map(point => { return { positions: this.canvasMapPoints(canvas.getBoundingClientRect(), [this.modeLinePreviousPoint, point]), point }}),
      filter(pos => pos.positions.fromPosition.x !== pos.positions.toPosition!.x || pos.positions.fromPosition.y !== pos.positions.toPosition!.y),
      shareReplay(1),
    );
    line$.subscribe(pos => {
      this.modeLinePreviousPoint = null;
      this.modeLineLastEndedPoint = pos.point;
      this.canvasDrawOnMove(pos.positions);
    });

    const erase$ = mouseDown$.pipe(
      filter(_ => this.formControlMode.value === 'Erase'),
      switchMap(_ => {
        return fromEvent(canvas, 'mousemove').pipe(
          takeUntil(fromEvent(canvas, 'mouseup')),
          takeUntil(fromEvent(canvas, 'mouseleave')),
          pairwise(),
        );
      }),
      map(res => this.canvasMapPoints(canvas.getBoundingClientRect(), res)),
      tap(points => {
        this.eraseSegmentsBuffer.push(points);
      }),
      distinctUntilChanged(),
      debounceTime(100),
      shareReplay(1),
    );
    erase$.subscribe(_ => {
      this.canvasEraseOnMove(this.eraseSegmentsBuffer);
      this.eraseSegmentsBuffer = [];
    });

    const text$ = mouseDown$.pipe(
      filter(_ => this.formControlMode.value === 'Text'),
      map(point => this.canvasMapPoints(canvas.getBoundingClientRect(), [point, point]))
    ).subscribe(positions => {
      // todo check if clicked on existing textarea
      if (this.activeTextareaId === null) {
        var input = document.createElement('textarea');
        this.activeTextareaLeft = positions.fromPosition.x;
        this.activeTextareaTop = positions.fromPosition.y;
        const calculatedX = positions.fromPosition.x + 40;
        const calculatedY = positions.fromPosition.y + 124;
        const maxWidth = this.CANVAS_SIZE - calculatedX;
        const maxHeight = this.CANVAS_SIZE - calculatedY;
        const defaultWidth = 200;
        const defaultHeight = 100;
        const newId = 'textarea_' + guid();
        input.id = newId;
        input.style.position = 'absolute';
        input.style.left = calculatedX + 'px';
        input.style.top = calculatedY + 'px';
        input.style.width = defaultWidth > maxWidth ? maxWidth + 'px' : defaultWidth + 'px';
        input.style.height = defaultHeight > maxHeight ? maxHeight + 'px' : defaultHeight + 'px';
        input.style.maxWidth = maxWidth + 'px';
        input.style.maxHeight = maxHeight + 'px';
        input.style.border = '1px solid black';
        input.style.backgroundColor = this.canvasDefaultBackgroundColor();
        input.style.color = this.formControlColor.value ?? getCanvasStandardColor();
        // const textChange$ = fromEvent(input, 'input').pipe(
        //   takeUntil(this.textAreaSaved$),
        //   takeUntil(this.destroyed$),
        //   map((event: any) => event.target.value as string),
        //   distinctUntilChanged(),
        //   debounceTime(500),
        // ).subscribe(
        //   // todo save
        // );
        canvas.parentNode?.appendChild(input);
        this.activeTextareaId = newId;
      } else {
        if (this.activeTextareaId && this.activeTextareaLeft && this.activeTextareaTop) {
          const input = document.getElementById(this.activeTextareaId);
          if (input) {
            const text = (input as HTMLTextAreaElement).value;
            this.canvasContext!.fillStyle = this.formControlColor.value ?? getCanvasStandardColor();
            this.canvasContext!.font = '20px Arial';
            this.canvasContext!.fillText(text, this.activeTextareaLeft, this.activeTextareaTop);
            input.remove();
            // todo save
          }
        }
        this.activeTextareaId = null;
      }
    });

    merge(
      draw$,
      line$,
      erase$,
    ).pipe(
      debounceTime(500),
    ).subscribe(_ => {
      this.currentStepperPoint = new Date();
      this.updatePage(canvas.toDataURL());
    });
  }

  canvasMapPoints(rect: any, res: any) {
    const fromPosition = {
      x: (res[0] as any).clientX - rect.left,
      y: (res[0] as any).clientY - rect.top
    };
    const toPosition = {
      x: (res[1] as any).clientX - rect.left,
      y: (res[1] as any).clientY - rect.top
    };
    return {
      id: guid(),
      color: this.formControlColor.value,
      created: new Date(),
      deleted: null,
      fromPosition: {
        id: guid(),
        x: fromPosition.x,
        y: fromPosition.y,
      },
      toPosition: {
        id: guid(),
        x: toPosition!.x,
        y: toPosition!.y,
      },
      text: null,
    } as DrawCanvasStorageDTO;
  }

  canvasDrawOnMove(storage: DrawCanvasStorageDTO) {
    if (!this.canvasContext) {
      return;
    }
    this.canvasContext.strokeStyle = this.formControlColor.value ?? getCanvasStandardColor();
    if (storage.fromPosition && storage.toPosition) {
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(storage.fromPosition.x, storage.fromPosition.y);
      this.canvasContext.lineTo(storage.toPosition.x, storage.toPosition.y);
      this.canvasContext.stroke();
      this.canvasStorage.push(storage);
      this.canvasContext.closePath();
    }
  }

  canvasDefaultBackgroundColor() {
    const white = getComputedStyle(document.documentElement).getPropertyValue('--learnz-light-white');
    return white;
  }

  canvasRestoreStorage() {
    const canvas = this.canvas?.nativeElement;
    const storage = this.canvasStorage.filter(storage => !storage.deleted);
    if (!this.canvasContext || !canvas) {
      return;
    }
    this.canvasContext!.fillStyle = this.canvasDefaultBackgroundColor();
    this.canvasContext!.clearRect(0, 0, canvas.width, canvas.height);
    this.canvasContext!.fillRect(0, 0, canvas.width, canvas.height);
    if (storage.length === 0) {
      return;
    }
    for (let i = 0; i < storage.length; i++) {
      const item = storage[i];
      if (item.fromPosition && item.toPosition) {
        this.canvasContext.strokeStyle = item.color;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(item.fromPosition.x, item.fromPosition.y);
        this.canvasContext.lineTo(item.toPosition.x, item.toPosition.y);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
      }
    }
    this.canvasContext.strokeStyle = this.formControlColor.value ?? getCanvasStandardColor();
  }

  canvasEraseOnMove(eraseAll: DrawCanvasStorageDTO[]) {
    if (!this.canvasContext) {
      return;
    }

    const timeStamp = new Date();
    for (let i = 0; i < eraseAll.length; i++) {
      const erase = eraseAll[i];
      const erased = this.canvasStorage
        .filter(s => s.deleted === null)
        .filter(s => {
          const path = { from: s.fromPosition, to: s.toPosition };
          return getDistanceBetweenSegments(path.from.x, path.from.y, path.to!.x, path.to!.y, erase.fromPosition.x, erase.fromPosition.y, erase.toPosition!.x, erase.toPosition!.y) < 10;
        })
        .map(s => s.id);
      
      this.canvasStorage = this.canvasStorage.map(s => {
        if (erased.includes(s.id)) {
          s.deleted = timeStamp;
        }
        return s;
      });
    }
    this.canvasSetup();
  }

  canvasSetImage(image: string) {
    const canvas = this.canvas?.nativeElement;
    if (this.canvasContext && canvas) {
      if (!!image) {
        const img = new Image();
        img.onload = () => {
          this.canvasContext!.drawImage(img, 0, 0);
        };
        img.src = image;
      } else {
        this.canvasSetup();
      }
    }
  }

  canvasChangeMode() {
    this.modeLinePreviousPoint = null;
  }

  createPage() {
    const value = {
      collectionId: this.collectionId,
      pageId: guid(),
    } as DrawPageCreateDTO;
    this.drawingService.createPage$(value).subscribe(_ => {
      this.canvasStorage = [];
      this.pageId$.next(value.pageId);
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, value.pageId], { queryParams: { [appRoutes.Edit]: true }});
    });
  }

  updatePage(dataUrl: string) {
    const value = {
      collectionId: this.collectionId,
      pageId: this.pageId$.value,
      dataUrl,
      canvasStorage: this.canvasStorage,
      stepperPosition: this.currentStepperPoint,
    } as DrawPageEditDTO;
    this.drawingService.updatePage$(value).subscribe();
  }

  editPage(pageId: string) {
    this.canvasStorage = [];
    this.pageId$.next(pageId);
    this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, pageId], { queryParams: { [appRoutes.Edit]: true }});
  }

  deletePage(pageId: string, pages: DrawPageGetDTO[]) {
    const currentPage = pages.filter(p => p.pageId === pageId)[0];
    const currentIndex = pages.indexOf(currentPage);
    const previousId = pageId === this.pageId$.value ? pages[currentIndex === 0 ? 1 : currentIndex - 1].pageId : this.pageId$.value;
    const dialog$ = this.dialog.open(DrawDeleteConfirmComponent, {
      data: {
        collectionId: this.collectionId,
        pageId,
      }
    });
    dialog$.afterClosed().subscribe(_ => {
      this.canvasStorage = [];
      this.pageId$.next(previousId);
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, previousId]);
    });
  }

  openPage(pageId: string) {
    this.canvasStorage = [];
    this.pageId$.next(pageId);
    if (this.formControlEditMode.value) {
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, pageId], { queryParams: { [appRoutes.Edit]: true }});
    } else {
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, pageId]);
    }
  }

  getActivePage(pages: DrawPageGetDTO[]) {
    const filtered = pages.filter(p => p.pageId === this.pageId$.value);
    if (filtered.length === 0) {
      return undefined;
    }
    return filtered[0];
  }

  navigateEditMode(editMode: boolean) {
    if (editMode) {
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, this.pageId$.value], { queryParams: { [appRoutes.Edit]: true }});
    } else {
      this.router.navigate([appRoutes.App, appRoutes.Draw, this.collectionId, this.pageId$.value]);
    }
    this.canvasStorage = [];
    this.pageId$.next(this.pageId$.value);
  }

  isSelectedColor(color: string) {
    return this.formControlColor.value === color;
  }

  isSelectedMode(mode: DrawCanvasType) {
    return this.formControlMode.value === mode;
  }

  selectedModeIcon() {
    const mode = this.modes.find(m => m.key === this.formControlMode.value);
    return mode?.value;
  }

  stepBackward() {
    const point = new Date(this.currentStepperPoint ?? new Date());
    const filtered = this.canvasStorage.filter(s => new Date(!s.deleted || s.created > s.deleted ? s.created : s.deleted) < point);
    if (filtered.length === 0) {
      return;
    }
    const lastChanged = filtered.sort((a, b) => new Date(!b.deleted || b.created > b.deleted ? b.created : b.deleted).getTime() - new Date(!a.deleted || a.created > a.deleted ? a.created : a.deleted).getTime())[0];
    const lastChangedTime = new Date(!lastChanged.deleted || lastChanged.created > lastChanged.deleted ? lastChanged.created : lastChanged.deleted);
    const pointRange = new Date(lastChangedTime.getTime() - 500);
    const idsToRevert = filtered.filter(s => new Date(!s.deleted || s.created > s.deleted ? s.created : s.deleted) > pointRange).map(s => s.id);
    this.canvasStorage = this.canvasStorage.map(s => {
      if (idsToRevert.includes(s.id)) {
        if (!s.deleted) {
          s.deleted = s.created;
        } else {
          s.created = s.deleted > s.created ? s.deleted : s.created;
          s.deleted = null;
        }
      }
      return s;
    });
    this.canvasRestoreStorage();
    this.currentStepperPoint = pointRange;
    const canvas = this.canvas?.nativeElement as HTMLCanvasElement;
    this.updatePage(canvas.toDataURL());
  }

  stepForward() {
    const point = new Date(this.currentStepperPoint ?? new Date());
    const filtered = this.canvasStorage.filter(s => new Date(!s.deleted || s.created > s.deleted ? s.created : s.deleted) > point);
    if (filtered.length === 0) {
      return;
    }
    const lastChanged = filtered.sort((a, b) => new Date(!a.deleted || a.created > a.deleted ? a.created : a.deleted).getTime() - new Date(!b.deleted || b.created > b.deleted ? b.created : b.deleted).getTime())[0];
    const lastChangedTime = new Date(!lastChanged.deleted || lastChanged.created > lastChanged.deleted ? lastChanged.created : lastChanged.deleted);
    const pointRange = new Date(lastChangedTime.getTime() + 500);
    const idsToRevert = filtered.filter(s => new Date(!s.deleted || s.created > s.deleted ? s.created : s.deleted) < pointRange).map(s => s.id);
    this.canvasStorage = this.canvasStorage.map(s => {
      if (idsToRevert.includes(s.id)) {
        if (!s.deleted) {
          s.deleted = s.created;
        } else {
          s.created = s.deleted > s.created ? s.deleted : s.created;
          s.deleted = null;
        }
      }
      return s;
    }
    );
    this.canvasRestoreStorage();
    const canvas = this.canvas?.nativeElement as HTMLCanvasElement;
    this.updatePage(canvas.toDataURL());
    this.currentStepperPoint = pointRange;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}