import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { endpoints } from 'src/app/Config/endpoints';
import { TokenDTO } from 'src/app/DTOs/Authentication/TokenDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { FormGroupTyped } from 'src/app/Material/types';
import { TokenService } from 'src/app/Framework/API/token.service';
import { AuthenticationChangePasswordInputDTO } from 'src/app/DTOs/Authentication/AuthenticationChangePasswordInputDTO';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

  formGroup: FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>;
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
      validator: (group: FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>) => {
        if (group.value.newPassword !== group.value.passwordConfirm) {
          return {
            passwordNotMatch: true,
          };
        }
        return null;
      }
    }) as FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>;
  }

  save() {
    this.isSaving = true;
    const value = {
      email: this.formGroup.value.email,
      oldPassword: this.formGroup.value.oldPassword,
      newPassword: this.formGroup.value.newPassword,
    } as AuthenticationChangePasswordInputDTO;
    this.apiService.callApi<TokenDTO>(endpoints.ChangePassword, value, "PUT").subscribe(token => {
      this.isSaving = false;
      this.close();
      this.tokenService.setToken(token.access);
      this.tokenService.setRefreshToken(token.refresh);
      this.tokenService.setExpired(token.accessExpires);
    });
  }

  close() {
    this.dialogRef.close();
  }
}