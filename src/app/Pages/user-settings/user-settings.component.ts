import {Component} from "@angular/core";
import {ApiService} from "../../Framework/API/api.service";
import {endpoints} from "../../Config/endpoints";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import {UserDTO} from "../../DTOs/UserDTO";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { SEXS } from "src/app/Enums/Sex";
import { UserProfileDTO } from "src/app/DTOs/UserProfileDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent {
    userForm: FormGroupTyped<UserDTO>;
    sexs = SEXS;
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
            profileImage: ["", Validators.required],
        }) as FormGroupTyped<UserDTO>;
        this.userForm.controls.email.disable();
        this.apiService.callApi<UserDTO>(endpoints.User, {}, "GET").subscribe((user) => { 
            this.darkTheme.setDarkTheme(user.darkTheme);
            this.userForm.patchValue({
                ...user,
                birthday: new Date(user.birthday),
            } as UserDTO);
            this.isLoading = false;
        });
    }

    saveUser(form: FormGroupTyped<UserDTO>) {
        // todo test / adjust with endpoint from backend
        this.isLoading = true;
        this.apiService.callApi(endpoints.User, form.value as UserProfileDTO, "PUT").subscribe(_ => {
            this.isLoading = false;
        });
    }

    changePassword(form: FormGroupTyped<UserDTO>) {
        // todo implement popup -> confirm, new 1st password, new 2nd password -> 1st & 2nd password must be equal by validator, then send to backend
    }

    changeDarkTheme(isDarkTheme: boolean) {
        this.darkTheme.setDarkTheme(isDarkTheme);
    }
}
