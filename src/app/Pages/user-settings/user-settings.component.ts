import {Component} from "@angular/core";
import {ApiService} from "../../Framework/API/api.service";
import {endpoints} from "../../Config/endpoints";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import {UserDTO} from "../../DTOs/UserDTO";
import { KeyValue } from "@angular/common";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent {
    // todo apply backend changes

    userForm: FormGroupTyped<UserDTO>;
    sexs: KeyValue<string, string>[] = [
        { key: "sex_male", value: "male" },
        { key: "sex_female", value: "female" },
        { key: "sex_other", value: "other" }
    ];
    isLoading: boolean = true;

    constructor(
      private apiService: ApiService,
      private builder: FormBuilder,
      private darkTheme: DarkThemeService,
    ) {
        this.userForm = this.builder.group({
            email: ["", [
                Validators.email,
                Validators.required
            ]],
            password: [""],
            firstName: ["",[
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ]],
            lastName: ["", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ]],
            birthday: ["", Validators.required],
            sex: ["", Validators.required],
            language: ["", Validators.required],
            darkTheme: ["", Validators.required],
            city: ["", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ]],
            postalCode: ["", Validators.required],
            street: ["", Validators.required],
            phone: ["", Validators.required],
            profileImg: ["", Validators.required],
        }) as FormGroupTyped<UserDTO>;
        this.userForm.controls.email.disable();
        this.apiService.callApi(endpoints.User, {}, "GET").subscribe((user) => { 
            this.userForm.patchValue(user as UserDTO);
            this.isLoading = false;
        });
    }

    saveUser(form: FormGroupTyped<UserDTO>) {
        this.isLoading = true;
        this.apiService.callApi<UserDTO>(endpoints.User, form.value, "PUT").subscribe(_ => {
            this.isLoading = false;
        });
    }

    changePassword(form: FormGroupTyped<UserDTO>) {
        // todo
    }

    changeDarkTheme(isDarkTheme: boolean) {
        this.darkTheme.setDarkTheme(isDarkTheme);
    }
}
