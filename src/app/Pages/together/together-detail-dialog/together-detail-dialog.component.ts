import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TogetherUserProfileDTO } from 'src/app/DTOs/Together/TogetherUserProfileDTO';
import { getGrades } from 'src/app/DTOs/Enums/Grade';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';

@Component({
  selector: 'app-together-detail-dialog',
  templateUrl: './together-detail-dialog.component.html',
  styleUrls: ['./together-detail-dialog.component.scss']
})
export class TogetherDetailDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TogetherUserProfileDTO & { showConnected: boolean },
    private dialog: MatDialogRef<TogetherDetailDialogComponent>,
    private router: Router,
  ) { }

  getData() {
    return this.data;
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
  }
  
  translateGrade(grade: number) {
    return 'Grade.' + getGrades().filter(g => g.value === grade)[0].key;
  }

  navigateConnections() {
    this.dialog.close();
    this.router.navigate([appRoutes.App, appRoutes.TogetherConnect]);
  }
}
