import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralQuestionQuestionDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionQuestionDTO';
import { GeneralQuestionAnswerDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionAnswerDTO';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';
import { ChallengeQuestionAnswerDTO } from 'src/app/DTOs/Challenge/ChallengeQuestionAnswerDTO';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-general-question',
  templateUrl: './general-question.component.html',
  styleUrls: ['./general-question.component.scss']
})
export class GeneralQuestionComponent implements OnInit {

  formGroup: FormGroup;
  multipleChoiceValues: string[] = [];
  distributeAnswers: KeyValue<string, string>[] = [];
  _currentAnswer: string | null = null;
  @Input() question: GeneralQuestionQuestionDTO = { } as GeneralQuestionQuestionDTO;
  @Input() challengeId: string = '';
  @Input() progress: string = '';
  @Input() isTest: boolean = false;
  @Input() maxPoints: number | null = null;
  @Input() set currentAnswer(answer: string | null) {
    this._currentAnswer = answer;
    this.patchCurrentAnswer();
  }
  @Input() disabled: boolean = false;
  @Output() answered: EventEmitter<GeneralQuestionAnswerDTO> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.patchCurrentAnswer();
  }

  patchCurrentAnswer() {
    if (this.isTest) {
      const questionTpye = this.getQuestionType(this.question.questionType);
      if (this.showForm(this.question.questionType)) {
        this.formGroup.controls['answer'].patchValue(this._currentAnswer ?? '');
        this.formGroup.controls['answer'].updateValueAndValidity();
      }
      else if (questionTpye === 'MultipleChoice') {
        this.multipleChoiceValues = (this._currentAnswer ?? '').split('|').filter(a => !!a);
      }
      else if (questionTpye === 'Distribute') {
        this.distributeAnswers = (this._currentAnswer ?? '').split('||').filter(a => !!a).map(a => {
          const split = a.split('|');
          return {
            key: split[0],
            value: split[1],
          } as KeyValue<string, string>;
        }).filter(a => !!a.key) ?? [];
      }
    }
  }

  saveForm() {
    const answer = this.formGroup.value.answer;
    const answerSanitized = typeof(answer) === 'string' ? answer : (answer as number).toString();
    this.answered.emit({
      challengeId: this.challengeId,
      answer: answerSanitized,
      questionId: this.question.questionId,
    } as GeneralQuestionAnswerDTO);
  }

  saveDistribute() {
    this.answered.emit({
      challengeId: this.challengeId,
      answer: this.distributeAnswers.map(a => a.key + '|' + a.value).join('||'),
      questionId: this.question.questionId,
    })
  }

  saveTrueFalse(value: boolean) {
    this.answered.emit({
      challengeId: this.challengeId,
      answer: value ? 'true' : 'false',
      questionId: this.question.questionId,
    } as GeneralQuestionAnswerDTO);
  }

  saveMultipleChoice() {
    this.answered.emit({
      challengeId: this.challengeId,
      answer: this.multipleChoiceValues.join('|'),
      questionId: this.question.questionId,
    } as GeneralQuestionAnswerDTO);
  }

  translateSubject(subject: string) {
    const filtered = getSubjects().filter(s => s.value === parseInt(subject));
    if (filtered.length === 0) {
      return '';
    }
    return 'Subject.' + filtered[0].key;
  }

  getQuestionType(type: number) {
    return getQuestionTypes().filter(t => t.value === type)[0].key;
  }

  toggleMultipleChoice(value: string) {
    if (this.multipleChoiceValues.includes(value)) {
      this.multipleChoiceValues = this.multipleChoiceValues.filter(v => v !== value);
    } else {
      this.multipleChoiceValues.push(value);
    }
  }

  distributeConnect(leftSideId: string, rightSideAnswer: string, rightSide: ChallengeQuestionAnswerDTO[]) {
    var answer = {
      key: leftSideId,
      value: rightSide.filter(rs => rs.answer === rightSideAnswer)[0].answerId,
    } as KeyValue<string, string>;
    this.distributeAnswers = this.distributeAnswers.filter(a => a.key !== leftSideId);
    this.distributeAnswers.push(answer);
  }

  showForm(type: number) {
    const questionType = this.getQuestionType(type);
    return questionType === 'Mathematic' || questionType === 'OpenQuestion' || questionType === 'TextField' || questionType === 'Word';
  }

  showText(type: number) {
    const questionType = this.getQuestionType(type);
    return questionType === 'OpenQuestion' || questionType === 'TextField' || questionType === 'Word';  
  }

  showTrueFalse(type: number) {
    return this.getQuestionType(type) === 'TrueFalse';
  }

  showMultipleChoice(type: number) {
    return this.getQuestionType(type) === 'MultipleChoice';
  }

  showDistribute(type: number) {
    return this.getQuestionType(type) === 'Distribute';
  }

  trueFalseIsSelected(answer: boolean) {
    if (answer) {
      return this._currentAnswer === 'true';
    }
    return this._currentAnswer === 'false';
  }

  checkBoxChecked(answerId: string) {
    const values = (this._currentAnswer ?? '').split('|');
    return values.includes(answerId);
  }

  distributeValue(answerIdLeftSide: string) {
    const answersFiltered = this.distributeAnswers.filter(a => a.key === answerIdLeftSide);
    if (answersFiltered.length === 0) {
      return null;
    }
    const answerId = answersFiltered[0].value;
    const resultFiltered = this.question.answerSetTwo?.filter(a => a.answerId === answerId) ?? [];
    if (resultFiltered.length === 0) {
      return null;
    }
    return resultFiltered[0].answer;
  }
}