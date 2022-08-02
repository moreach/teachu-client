import { Component } from '@angular/core';
import {FormGroupTyped} from "../../Material/types";
import {PasswordChangeDTO} from "../../DTOs/xx_old/PasswordChangeDTO";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../Framework/API/api.service";
import {TokenService} from "../../Framework/API/token.service";
import {TokenDTO} from "../../DTOs/Authentication/TokenDTO";
import {endpoints} from "../../Config/endpoints";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    formGroup: FormGroupTyped<PasswordChangeDTO & { passwordConfirm: string }>;
    isSaving: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
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

    save() {  // FIXME
        this.isSaving = true;
        const value = {
            email: this.formGroup.value.email,
            oldPassword: this.formGroup.value.oldPassword,
            newPassword: this.formGroup.value.newPassword,
        } as PasswordChangeDTO;
        this.apiService.callApi<TokenDTO>(endpoints.ChangePassword, value, "PUT").subscribe(token => {
            this.isSaving = false;
            this.tokenService.setToken(token.access);
            this.tokenService.setRefreshToken(token.refresh);
            this.tokenService.setExpired(token.accessExpires);
        });
    }

}
