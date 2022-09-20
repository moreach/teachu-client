import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileVersionInfoDTO } from 'src/app/DTOs/File/FileVersionInfoDTO';
import { FileHistoryDialogService } from './file-history-dialog.service';

@Component({
  selector: 'app-file-history-dialog',
  templateUrl: './file-history-dialog.component.html',
  styleUrls: ['./file-history-dialog.component.scss']
})
export class FileHistoryDialogComponent {

  versions$: Observable<FileVersionInfoDTO[]>;
  path: string;
  revertable: boolean;

  onEdit = new EventEmitter<string>();

  constructor(
    private fileHistoryService: FileHistoryDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FileHistoryDialogComponent>,
  ) {
    this.path = this.data.path;
    this.revertable = this.data.revertable;
    this.versions$ = this.fileHistoryService.getVersions(this.path);
  }

  revertVersion(versionPath: string) {
    this.fileHistoryService.revertVersion(versionPath, this.path).subscribe(filePath => {
      this.onEdit.emit(filePath.path);
      this.dialogRef.close();
    });
  }

  downloadVersion(filePath: string, fileName: string) {
    this.fileHistoryService.downloadVersion(filePath).subscribe((event: any) => {
      if (event.type === HttpEventType.Response) {
        this.download(event, fileName);
      }
    });
  }

  private download(data: any, fileName: string) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}