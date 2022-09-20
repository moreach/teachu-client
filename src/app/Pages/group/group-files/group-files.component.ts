import { KeyValue } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { FileFrontendHistorizedDTO } from 'src/app/DTOs/File/FileFrontendHistorizedDTO';
import { GroupFileChangeDTO } from 'src/app/DTOs/Group/GroupFileChangeDTO';
import { HttpMethods } from 'src/app/Framework/API/api-extension.service';
import { commonTypes } from 'src/app/Framework/Helpers/FileTypesHelper';
import { GroupFilesService } from './group-files.service';

@Component({
  selector: 'app-group-files',
  templateUrl: './group-files.component.html',
  styleUrls: ['./group-files.component.scss']
})
export class GroupFilesComponent implements OnDestroy {

  groupId: string;
  files$: Observable<FileFrontendHistorizedDTO []>;
  _files$ = new BehaviorSubject<FileFrontendHistorizedDTO[]>([]);
  private destroyed$ = new Subject<void>();

  constructor(
    private filesService: GroupFilesService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.groupId = this.activatedRoute.snapshot.paramMap.get(appRoutes.GroupFilesId) ?? '';
    this.filesService.getFiles(this.groupId).pipe(takeUntil(this.destroyed$)).subscribe(value => this._files$.next(value));
    this.files$ = this._files$.asObservable();
  }

  fileTypes(): string {
    return commonTypes();
  }

  fileChanged(fileChange: KeyValue<string, HttpMethods>) {
    const value = {
      groupId: this.groupId,
      path: fileChange.key,
    } as GroupFileChangeDTO;
    this.filesService.fileChange(value, fileChange.value);
  }

  addFile() {
    this._files$.next([...this._files$.value, {} as FileFrontendHistorizedDTO]);
  }

  convertNull(file: FileFrontendHistorizedDTO) {
    if (file == {} as FileFrontendHistorizedDTO) {
      return null;
    }
    return file;
  }

  isEmpty(files: FileFrontendHistorizedDTO[]) {
    return files.length === 0;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}