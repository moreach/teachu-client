import { Component } from '@angular/core';
import {FormGroupTyped} from "../../Material/types";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../Framework/API/api.service";
import {TokenService} from "../../Framework/API/token.service";
import {TokenDTO} from "../../DTOs/Authentication/TokenDTO";
import {endpoints} from "../../Config/endpoints";
import {AuthenticationChangePasswordInputDTO} from "../../DTOs/Authentication/AuthenticationChangePasswordInputDTO";
import {catchError} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    formGroup: FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>;
    errorMessage: string = "";

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
            validator: (group: FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>) => {
                if (group.value.newPassword !== group.value.passwordConfirm) {
                    this.errorMessage = "New passwords aren't the same.";
                    return {
                        passwordNotMatch: true,
                    };
                } else this.errorMessage = "";
                return null;
            }
        }) as FormGroupTyped<AuthenticationChangePasswordInputDTO & { passwordConfirm: string }>;
    }

    save() {
        const value = {
            email: this.formGroup.value.email,
            oldPassword: this.formGroup.value.oldPassword,
            newPassword: this.formGroup.value.newPassword,
        } as AuthenticationChangePasswordInputDTO;

        const validationError = this.validatePassword(value.newPassword);
        if(!validationError) {
            // TODO: find a way to disable the error interceptor for only this request
            this.apiService.callApi<TokenDTO>(endpoints.ChangePassword, value, "PUT").pipe(
                catchError(() => this.errorMessage = "userSettings.passwordValidation.wrongCurrent")
            ).subscribe(res => {
                const token: TokenDTO = res as TokenDTO;
                this.tokenService.setToken(token.access);
                this.tokenService.setRefreshToken(token.refresh);
                this.tokenService.setExpired(token.accessExpires);
            });
        } else this.errorMessage = validationError;
    }

    private validatePassword(password: string): string { // same as backend validation
        // min 8 digits - one uppercase - one number - one lowercase
        const atLeastOneNumber: RegExp = new RegExp("^(?=.*\\d).*$");
        const atLeastOneUppercase: RegExp = new RegExp("^(?=.*[A-Z]).*$");
        const atLeastOneLowercase: RegExp = new RegExp("^(?=.*[a-z]).*$");

        if(password.length < 8)
            return "userSettings.passwordValidation.toShort";
        if(!atLeastOneNumber.test(password))
            return "userSettings.passwordValidation.missingNumber";
        if(!atLeastOneUppercase.test(password))
            return "userSettings.passwordValidation.missingCapital";
        if(!atLeastOneLowercase.test(password))
            return "userSettings.passwordValidation.missingLow";


        return "";
    }
}
