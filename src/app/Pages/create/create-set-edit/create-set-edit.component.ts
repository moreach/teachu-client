import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { CreateQuestionOpenQuestionDTO } from 'src/app/DTOs/Create/CreateQuestionOpenQuestionDTO';
import { CreateUpsertSetHeaderDTO } from 'src/app/DTOs/Create/CreateUpsertSetHeaderDTO';
import { CreateUpsertSetQuestionsDTO } from 'src/app/DTOs/Create/CreateUpsertSetQuestionsDTO';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';
import { getSetPolicies } from 'src/app/DTOs/Enums/SetPolicy';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { CreateSetDialogComponent } from '../create-set-dialog/create-set-dialog.component';
import { CreateSetEditService } from './create-set-edit.service';
import { v4 as guid } from 'uuid';
import { CreateQuestionTextFieldDTO } from 'src/app/DTOs/Create/CreateQuestionTextFieldDTO';
import { CreateQuestionTrueFalseDTO } from 'src/app/DTOs/Create/CreateQuestionTrueFalseDTO';
import { CreateQuestionWordDTO } from 'src/app/DTOs/Create/CreateQuestionWordDTO';
import { CreateQuestionDistributeDTO } from 'src/app/DTOs/Create/CreateQuestionDistributeDTO';
import { CreateQuestionMathematicDTO } from 'src/app/DTOs/Create/CreateQuestionMathematicDTO';
import { CreateQuestionMultipleChoiceDTO } from 'src/app/DTOs/Create/CreateQuestionMultipleChoiceDTO';

@Component({
  selector: 'app-create-set-edit',
  templateUrl: './create-set-edit.component.html',
  styleUrls: ['./create-set-edit.component.scss']
})
export class CreateSetEditComponent {

  setId: string;
  setHeader$: Observable<CreateUpsertSetHeaderDTO>;
  _setQuestions$ = new BehaviorSubject<CreateUpsertSetQuestionsDTO>({} as CreateUpsertSetQuestionsDTO);
  setQuestions$: Observable<{ questions: CreateUpsertSetQuestionsDTO, editable: boolean }>;
  isEditMode$ = new BehaviorSubject<boolean>(false);
  currentFormValue: CreateUpsertSetQuestionsDTO = { } as any;
  formGroupAddQuestion: FormGroup;
  questionTypes = getQuestionTypes();

  constructor(
    private editSetService: CreateSetEditService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.setId = this.activatedRoute.snapshot.paramMap.get(appRoutes.CreateSetEditId) ?? '';
    this.setHeader$ = this.editSetService.getHeader$(this.setId);
    this.editSetService.getQuestions$(this.setId).subscribe(questions => {
      this._setQuestions$.next(questions);
      this.currentFormValue = questions;
    });
    this.formGroupAddQuestion = this.formBuilder.group({
      questionType: [null, Validators.required],
    });
    this.setQuestions$ = combineLatest([
      this._setQuestions$.asObservable(),
      this.isEditMode$.asObservable().pipe(startWith(false), distinctUntilChanged()),
    ]).pipe(
      map(([setQuestions, editable]) => {
        return {
          questions: setQuestions,
          editable
        }
      }),
    );
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get(appRoutes.Edit) === 'true';
    const isPolicyEditable = this.activatedRoute.snapshot.queryParamMap.get(appRoutes.EditPolicy) === 'true';
    if (isEdit) {
      this.editHeader(this.setId, isPolicyEditable);
      this.editQuestions();
    }
  }

  editHeader(setId: string, isPolicyEditable: boolean) {
    const dialog = this.dialog.open(CreateSetDialogComponent, { data: {
      isNew: false,
      isPolicyEditable,
      setId,
    }});
    dialog.afterClosed().subscribe(_ => this.setHeader$ = this.editSetService.getHeader$(this.setId));
  }

  addQuestion() {
    if (!this.isEditMode$.value) {
      this.editQuestions();
    }
    const questionTypeFilter = getQuestionTypes().filter(x => x.value === this.formGroupAddQuestion.value.questionType);
    if (questionTypeFilter.length === 0) {
      return;
    }
    const questionType = questionTypeFilter[0].key;
    let nextValue = {
      ...this._setQuestions$.value,
    };
    switch (questionType) {
      case 'Distribute':
        nextValue.questionsDistribute = [...nextValue.questionsDistribute ?? [], { 
          id: guid(),
          question: '',
          answers: [],
        } as CreateQuestionDistributeDTO];
        break;
      case 'Mathematic':
        nextValue.questionsMathematic = [...nextValue.questionsMathematic ?? [], {
          id: guid(),
          answer: '',
          digits: 0,
          question: '',
          variables: [],
        } as CreateQuestionMathematicDTO];
        break;
      case 'MultipleChoice':
        nextValue.questionsMultipleChoice = [...nextValue.questionsMultipleChoice ?? [], {
          id: guid(),
          question: '',
          answers: [],
        } as CreateQuestionMultipleChoiceDTO];
        break;
      case 'OpenQuestion':
        nextValue.questionsOpenQuestion = [...nextValue.questionsOpenQuestion ?? [], { 
          id: guid(),
          question: '',
          answer: '',
        } as CreateQuestionOpenQuestionDTO];
        break;
      case 'TextField':
        nextValue.questionsTextField = [...nextValue.questionsTextField ?? [], {
          id: guid(),
          question: '',
        } as CreateQuestionTextFieldDTO];
        break;
      case 'TrueFalse':
        nextValue.questionsTrueFalse = [...nextValue.questionsTrueFalse ?? [], {
          id: guid(),
          question: '',
          answer: true,
        } as CreateQuestionTrueFalseDTO];
        break;
      case 'Word':
        nextValue.questionsWord = [...nextValue.questionsWord ?? [], {
          id: guid(),
          languageSubjectMain: '',
          languageSubjectSecond: '',
        } as CreateQuestionWordDTO];
        break;
      default:
        break;
    }
    this._setQuestions$.next(nextValue);
    this.currentFormValue = nextValue;
  }

  editQuestions() {
    this.isEditMode$.next(true);
  }

  save() {
    this.editSetService.setQuestions(this.currentFormValue);
    this.isEditMode$.next(false);
  }

  translateSetPolicy(setPolicy: number) {
    return getSetPolicies().filter(x => x.value === setPolicy)[0].key;
  }

  translateSubject(subject: number) {
    return getSubjects().filter(x => x.value === subject)[0].key;
  }

  isEmpty(value: any[]) {
    return (value ?? []).length === 0;
  }

  questionChange(value: any) {
    const questionId = value.id;
    const questionsDistribute = this.currentFormValue.questionsDistribute.map(q => q.id === questionId ? value : q);
    const questionsMathematic = this.currentFormValue.questionsMathematic.map(q => q.id === questionId ? value : q);
    const questionsMultipleChoice = this.currentFormValue.questionsMultipleChoice.map(q => q.id === questionId ? value : q);
    const questionsOpenQuestion = this.currentFormValue.questionsOpenQuestion.map(q => q.id === questionId ? value : q);
    const questionsTrueFalse = this.currentFormValue.questionsTrueFalse.map(q => q.id === questionId ? value : q);
    const questionsTextField = this.currentFormValue.questionsTextField.map(q => q.id === questionId ? value : q);
    const questionsWord = this.currentFormValue.questionsWord.map(q => q.id === questionId ? value : q);
    this.currentFormValue = {
      setId: this.currentFormValue.setId,
      questionsDistribute,
      questionsMathematic,
      questionsMultipleChoice,
      questionsOpenQuestion,
      questionsTrueFalse,
      questionsTextField,
      questionsWord,
    };
  }

  questionDelete(questionId: string) {
    this.currentFormValue.questionsDistribute = this.currentFormValue.questionsDistribute.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsMathematic = this.currentFormValue.questionsMathematic.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsMultipleChoice = this.currentFormValue.questionsMultipleChoice.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsOpenQuestion = this.currentFormValue.questionsOpenQuestion.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsTrueFalse = this.currentFormValue.questionsTrueFalse.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsTextField = this.currentFormValue.questionsTextField.filter(q =>  q.id !== questionId);
    this.currentFormValue.questionsWord = this.currentFormValue.questionsWord.filter(q =>  q.id !== questionId);
    this._setQuestions$.next(this.currentFormValue);
  }
}
