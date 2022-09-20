import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { DrawDeleteConfirmService } from './draw-delete-confirm.service';

@Component({
  selector: 'app-draw-delete-confirm',
  templateUrl: './draw-delete-confirm.component.html',
  styleUrls: ['./draw-delete-confirm.component.scss']
})
export class DrawDeleteConfirmComponent {

  collectionId: string;
  pageId: string | null = null;

  constructor(
    private deleteConfirmService: DrawDeleteConfirmService,
    private dialogRef: MatDialogRef<DrawDeleteConfirmComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.collectionId = data.collectionId;
    if (data.pageId) {
      this.pageId = data.pageId;
    }
  }

  save() {
    if (this.pageId) {
      this.deletePage(this.collectionId, this.pageId);
    } else {
      this.deleteCollection(this.collectionId);
    }
  }

  deleteCollection(collectionId: string) {
    this.deleteConfirmService.deleteCollection$(collectionId).subscribe(_ => {
      this.dialogRef.close();
      this.router.navigate([appRoutes.App, appRoutes.Draw]);
    });
  }

  deletePage(collectionId: string, pageId: string) {
    this.deleteConfirmService.deletePage$(collectionId, pageId).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}