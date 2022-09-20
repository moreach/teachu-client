import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestAdjustUserPointDTO } from 'src/app/DTOs/Test/TestAdjustUserPointDTO';
import { TestEditPointsService } from './test-edit-points.service';

@Component({
  selector: 'app-test-edit-points',
  templateUrl: './test-edit-points.component.html',
  styleUrls: ['./test-edit-points.component.scss']
})
export class TestEditPointsComponent {

  userId: string;
  questionId: string;
  isCorrect: FormControl;
  pointsScored: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TestEditPointsComponent>,
    private editPointsService: TestEditPointsService,
  ) {
    this.userId = data.userId;
    this.questionId = data.questionId;
    this.isCorrect = new FormControl(data.isCorrect);
    this.pointsScored = new FormControl(data.pointsScored);
  }

  save() {
    const value = {
      testOfUserId: this.userId ?? '',
      questionId: this.questionId,
      isCorrect: this.isCorrect.value,
      pointsScored: this.pointsScored.value,
    } as TestAdjustUserPointDTO;
    this.editPointsService.adjustUserPoints$(value).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
