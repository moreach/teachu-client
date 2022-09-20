import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { DrawCollectionGetDTO } from 'src/app/DTOs/Draw/DrawCollectionGetDTO';
import { DrawDeleteConfirmComponent } from './draw-delete-confirm/draw-delete-confirm.component';
import { DrawSettingsComponent } from './draw-settings/draw-settings.component';
import { DrawService } from './draw.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnDestroy {

  private destroyed$ = new Subject<void>();
  collections$: Observable<DrawCollectionGetDTO[]>;

  constructor(
    private drawService: DrawService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.collections$ = this.drawService.getCollections$().pipe(
      takeUntil(this.destroyed$),
    );
  }

  createCollection() {
    this.dialog.open(DrawSettingsComponent, {
      data: {
        collectionId: null,
        activePageId: null,
        name: null,
        groupId: null,
        drawGroupPolicy: null,
      }
    });
  }

  editCollection(collectionId: string, firstPageId: string, name: string, groupId: string | null, drawGroupPolicy: number | null) {
    this.dialog.open(DrawSettingsComponent, {
      data: {
        collectionId,
        activePageId: firstPageId,
        name,
        groupId,
        drawGroupPolicy,
      }
    });
  }

  deleteCollection(collectionId: string) {
    this.dialog.open(DrawDeleteConfirmComponent, {
      data: {
        collectionId
      }
    });
  }

  openDrawing(collectionId: string, firstPageId: string) {
    this.router.navigate([appRoutes.App, appRoutes.Draw, collectionId, firstPageId]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}