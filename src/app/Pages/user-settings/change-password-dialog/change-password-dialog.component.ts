import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { endpoints } from 'src/app/Config/endpoints';
import { PasswordChangeDTO } from 'src/app/DTOs/PasswordChangeDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

  formGroup: FormGroupTyped<PasswordChangeDTO & { passwordConfirm: string }>;
  isSaving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
  ) {
    this.formGroup = this.formBuilder.group({
      passwordOld: ['', Validators.required],
      passwordNew: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, {
      validator: (group: FormGroupTyped<PasswordChangeDTO & { passwordConfirm: string }>) => {
        if (group.value.passwordNew !== group.value.passwordConfirm) {
          return {
            passwordNotMatch: true,
          };
        }
        return null;
      }
    }) as FormGroupTyped<PasswordChangeDTO & { passwordConfirm: string }>;
  }

  save() {
    this.isSaving = true;
    const value = {
      passwordOld: this.formGroup.value.passwordOld,
      passwordNew: this.formGroup.value.passwordNew,
    } as PasswordChangeDTO;
    // todo fix with backend
    this.apiService.callApi(endpoints.ChangePassword, value, "POST").subscribe(_ => {
      this.isSaving = false;
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}