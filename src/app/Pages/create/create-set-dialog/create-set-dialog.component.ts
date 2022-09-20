import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateUpsertSetHeaderDTO } from 'src/app/DTOs/Create/CreateUpsertSetHeaderDTO';
import { getSetPolicies } from 'src/app/DTOs/Enums/SetPolicy';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { FormGroupTyped } from 'src/app/Material/types';
import { CreateSetDialogService } from './create-set-dialog.service';
import { appRoutes } from 'src/app/Config/appRoutes';

@Component({
  selector: 'app-create-set-dialog',
  templateUrl: './create-set-dialog.component.html',
  styleUrls: ['./create-set-dialog.component.scss']
})
export class CreateSetDialogComponent {

  formGroup: FormGroupTyped<CreateUpsertSetHeaderDTO>;
  isPolicyEditable: boolean;
  subjects = getSubjects();
  policies = getSetPolicies();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private headerService: CreateSetDialogService,
    private dialogRef: MatDialogRef<CreateSetDialogComponent>,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      description: ['', Validators.required],
      setPolicy: [null, Validators.required],
      subjectMain: [null, Validators.required],
      subjectSecond: null,
    }) as any as FormGroupTyped<CreateUpsertSetHeaderDTO>;
    this.isPolicyEditable = this.data.isPolicyEditable;
    if (this.data.isNew as boolean) {
      this.formGroup.controls.id.patchValue(this.data.setId as string);
    } else {
      this.headerService.getHeader(this.data.setId as string).subscribe(header => {
        this.formGroup.patchValue(header);
      });
    }
  }

  save() {
    this.headerService.upsertHeader(this.formGroup.value).subscribe(_ => {
      this.dialogRef.close();
      this.router.navigate([appRoutes.App, appRoutes.Create, this.data.setId]);
    });
  }

  close() {
    this.dialogRef.close();
  }
}