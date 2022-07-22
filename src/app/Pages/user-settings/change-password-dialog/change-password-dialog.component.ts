import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { endpoints } from 'src/app/Config/endpoints';
import { PasswordChangeDTO } from 'src/app/DTOs/xx_old/PasswordChangeDTO';
import { TokenDTO } from 'src/app/DTOs/xx_old/TokenDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { FormGroupTyped } from 'src/app/Material/types';
import { TokenService } from 'src/app/Framework/API/token.service';

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
    private tokenService: TokenService,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, {
      validator: (group: FormGroupTyped<PasswordChangeDTO & { passwordConfirm: string }>) => {
        if (group.value.newPassword !== group.value.passwordConfirm) {
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
      email: this.formGroup.value.email,
      oldPassword: this.formGroup.value.oldPassword,
      newPassword: this.formGroup.value.newPassword,
    } as PasswordChangeDTO;
    this.apiService.callApi<TokenDTO>(endpoints.ChangePassword, value, "PUT").subscribe(token => {
      this.isSaving = false;
      this.close();
      this.tokenService.setToken(token.access);
      this.tokenService.setRefreshToken(token.refresh);
      this.tokenService.setExpired(token.refreshExpires);
    });
  }

  close() {
    this.dialogRef.close();
  }
}