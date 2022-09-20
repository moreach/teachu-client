import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-question-mathematic-check-dialog',
  templateUrl: './create-question-mathematic-check-dialog.component.html',
  styleUrls: ['./create-question-mathematic-check-dialog.component.scss']
})
export class CreateQuestionMathematicCheckDialogComponent {

  question: string;
  answer: string;
  answerMin: string;
  answerMax: string;
  minEvaluated: string;
  maxEvaluated: string;
  minError: boolean;
  maxError: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.question = this.data.question;
    this.answer = this.data.answer;
    this.answerMin = this.data.answerMin;
    this.answerMax = this.data.answerMax;
    this.minEvaluated = this.data.minEvaluated;
    this.maxEvaluated = this.data.maxEvaluated;
    this.minError = this.data.minError;
    this.maxError = this.data.maxError;
  }
}