import {Component} from "@angular/core";
import {ApiService} from "../../Framework/API/api.service";
import {endpoints} from "../../Config/endpoints";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import {UserDTO} from "../../DTOs/UserDTO";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { SEXS } from "src/app/Enums/Sex";
import { UserProfileDTO } from "src/app/DTOs/UserProfileDTO";
import { ChangeProfileDTO } from "src/app/DTOs/ChangeProfileDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent {
    userForm: FormGroupTyped<UserDTO & {mail: string}>;
    sexs = SEXS;
    isLoading: boolean = true;

    constructor(
      private apiService: ApiService,
      private builder: FormBuilder,
      private darkTheme: DarkThemeService,
    ) {
        this.userForm = this.builder.group({
            mail: '',
            email: '',
            firstName: '',
            lastName: '',
            birthday: null,
            sex: null,
            language: null,
            darkTheme: ["", Validators.required],
            city: '',
            postalCode: '',
            street: '',
            phone: ["", Validators.required],
            profileImage: ["", Validators.required],
        }) as FormGroupTyped<UserDTO & { mail: string }>;
        this.userForm.controls.email.disable();
        this.apiService.callApi<UserDTO>(endpoints.User, {}, "GET").subscribe((user) => { 
            this.darkTheme.setDarkTheme(user.darkTheme);
            this.userForm.patchValue({
                ...user,
                mail: user.email,
                birthday: new Date(user.birthday),
            } as UserDTO);
            this.isLoading = false;
        });
    }

    saveUser(form: FormGroupTyped<UserDTO>) {
        // todo test / adjust with endpoint from backend
        this.isLoading = true;
        const formValue = {
            language: form.value.language,
            darkTheme: form.value.darkTheme,
            phone: form.value.phone,
            profileImage: form.value.profileImage
        } as ChangeProfileDTO;
        this.apiService.callApi(endpoints.UserProfile, formValue, "PUT").subscribe(_ => {
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
