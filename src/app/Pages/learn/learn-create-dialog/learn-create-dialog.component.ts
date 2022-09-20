import { KeyValue } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { LearnOpenNewSessionDTO } from 'src/app/DTOs/Learn/LearnOpenNewSessionDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { LearnCreateDialogService } from './learn-create-dialog.service';
import { v4 as guid } from 'uuid';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { appRoutes } from 'src/app/Config/appRoutes';

@Component({
  selector: 'app-learn-create-dialog',
  templateUrl: './learn-create-dialog.component.html',
  styleUrls: ['./learn-create-dialog.component.scss']
})
export class LearnCreateDialogComponent {

  formGroup: FormGroupTyped<LearnOpenNewSessionDTO>;
  setEditable: boolean;
  setName: string = '';
  learnSessionId: string;
  filterSetControl = new FormControl('');
  filteredOptions$: Observable<KeyValue<string, string>[]>;

  constructor(
    private createDialogService: LearnCreateDialogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LearnCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    this.learnSessionId = guid();
    this.formGroup = this.formBuilder.group({
      learnSessionId: this.learnSessionId,
      setId: ['', Validators.required],
      onlyHardQuestions: false,
    }) as FormGroupTyped<LearnOpenNewSessionDTO>;
    this.setEditable = data.setEditable as boolean;
    if (!this.setEditable) {
      this.setName = data.setName as string;
      this.formGroup.controls.setId.patchValue(data.setId as string);
    }
    this.filteredOptions$ = this.filterSetControl.valueChanges.pipe(
      startWith(''),
      switchMap(filter => this.createDialogService.getFilteredSets$(filter ?? '')),
    );
  }

  save() {
    this.createDialogService.createSession$(this.formGroup.value).subscribe(_ => {
      this.dialogRef.close();
      this.router.navigate([appRoutes.App, appRoutes.Learn, appRoutes.LearnWrite, this.learnSessionId]);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  selectSet(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this.filterSetControl.patchValue(value.key);
    this.formGroup.controls.setId.patchValue(value.value);
  }
}