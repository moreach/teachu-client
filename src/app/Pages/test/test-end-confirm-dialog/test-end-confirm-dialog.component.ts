import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestEndConfirmService } from './test-end-confirm.service';

@Component({
  selector: 'app-test-end-confirm-dialog',
  templateUrl: './test-end-confirm-dialog.component.html',
  styleUrls: ['./test-end-confirm-dialog.component.scss']
})
export class TestEndConfirmDialogComponent {

  testOfUserId: string;

  constructor(
    private testEndService: TestEndConfirmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TestEndConfirmDialogComponent>,
    private router: Router,
  ) {
    this.testOfUserId = data;
  }

  save() {
    this.testEndService.endTest$(this.testOfUserId).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate([appRoutes.App, appRoutes.Test]);
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}