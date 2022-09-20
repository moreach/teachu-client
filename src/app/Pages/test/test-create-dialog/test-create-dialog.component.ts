import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, startWith, switchMap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestCreateDTO } from 'src/app/DTOs/Test/TestCreateDTO';
import { TestGroupTestCreateDTO } from 'src/app/DTOs/Test/TestGroupTestCreateDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { TestCreateDialogService } from './test-create-dialog.service';
import { v4 as guid } from 'uuid';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { KeyValue } from '@angular/common';
import { ChallengeCreateDialogService } from '../../challenge/challenge-create-dialog/challenge-create-dialog.service';

@Component({
  selector: 'app-test-create-dialog',
  templateUrl: './test-create-dialog.component.html',
  styleUrls: ['./test-create-dialog.component.scss']
})
export class TestCreateDialogComponent {

  setEditable: boolean;
  setName: string = '';

  isGroupTest$ = new BehaviorSubject<boolean>(false);
  formGroupTestNormal: FormGroupTyped<TestCreateDTO>;
  formGroupTestGroupTest: FormGroupTyped<TestGroupTestCreateDTO>;
  formControlGroupTest: FormControl;

  filterSetControl = new FormControl('');
  filteredOptionsSet$: Observable<KeyValue<string, string>[]>;
  filterGroupControl = new FormControl('');
  filteredOptionsGroup$: Observable<KeyValue<string, string>[]>;

  constructor(
    private createDialogService: TestCreateDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TestCreateDialogComponent>,
    private challengeCreateService: ChallengeCreateDialogService,
  ) {
    this.formControlGroupTest = new FormControl(false);
    this.formControlGroupTest.valueChanges.subscribe(_ => {
      this.formGroupTestNormal.updateValueAndValidity();
      this.formGroupTestGroupTest.updateValueAndValidity();
    });

    this.formGroupTestNormal = this.formBuilder.group({
      testId: [guid(), Validators.required],
      setId: ['', Validators.required],
      name: ['', Validators.required],
      maxTime: [0, [Validators.required, Validators.min(1)]],
    }) as FormGroupTyped<TestCreateDTO>;

    this.formGroupTestGroupTest = this.formBuilder.group({
      testId: [guid(), Validators.required],
      setId: ['', Validators.required],
      name: ['', Validators.required],
      maxTime: [0, [Validators.required, Validators.min(1)]],
      groupId: ['', Validators.required],
    }) as FormGroupTyped<TestGroupTestCreateDTO>;

    this.setEditable = data.setEditable as boolean;
    if (!this.setEditable) {
      this.setName = data.setName as string;
      this.formGroupTestNormal.controls.setId.patchValue(data.setId as string);
      this.formGroupTestGroupTest.controls.setId.patchValue(data.setId as string);
    }

    this.filteredOptionsSet$ = this.filterSetControl.valueChanges.pipe(
      startWith(''),
      switchMap(filter => this.challengeCreateService.getFilteredSets$(filter ?? '')),
    );

    this.filteredOptionsGroup$ = this.filterGroupControl.valueChanges.pipe(
      startWith(''),
      switchMap(filter => this.createDialogService.getFilteredGroups$(filter ?? '')),
    );
  }

  changeTestType(isGroupTest: boolean) {
    this.isGroupTest$.next(isGroupTest);
    if (isGroupTest) {
      const previousValue = this.formGroupTestNormal.value;
      this.formGroupTestGroupTest.controls.setId.patchValue(previousValue.setId);
      this.formGroupTestGroupTest.controls.name.patchValue(previousValue.name);
      this.formGroupTestGroupTest.controls.maxTime.patchValue(previousValue.maxTime);
    } else {
      const previousValue = this.formGroupTestGroupTest.value;
      this.formGroupTestNormal.controls.setId.patchValue(previousValue.setId);
      this.formGroupTestNormal.controls.name.patchValue(previousValue.name);
      this.formGroupTestNormal.controls.maxTime.patchValue(previousValue.maxTime);
    }
  }

  save() {
    if (this.isGroupTest$.value) {
      this.createDialogService.testGrouTestCreate$(this.formGroupTestGroupTest.value).subscribe(_ => {
        this.dialogRef.close();
        this.router.navigate([appRoutes.App, appRoutes.Test]);
      });
    } else {
      this.createDialogService.testCreate$(this.formGroupTestNormal.value).subscribe(_ => {
        this.dialogRef.close();
        this.router.navigate([appRoutes.App, appRoutes.Test]);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  selectSet(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this.filterSetControl.patchValue(value.key);
    this.formGroupTestNormal.controls.setId.patchValue(value.value);
    this.formGroupTestGroupTest.controls.setId.patchValue(value.value);
  }

  selectGroup(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this.filterGroupControl.patchValue(value.key);
    this.formGroupTestGroupTest.controls.groupId.patchValue(value.value);
  }
}
