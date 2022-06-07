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
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordDialogComponent } from "./change-password-dialog/change-password-dialog.component";
import { UserService } from "./user.service";

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
      private builder: FormBuilder,
      private darkTheme: DarkThemeService,
      private dialog: MatDialog,
      private userService: UserService,
    ) {
        this.userForm = this.builder.group({
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
        }) as FormGroupTyped<UserDTO>;
        this.userService.getCurrentUser$().subscribe((user) => { 
            this.darkTheme.setDarkTheme(user.darkTheme);
            this.userForm.patchValue({
                ...user,
                birthday: new Date(user.birthday),
            } as UserDTO);
            this.isLoading = false;
        });
    }

    saveUser(form: FormGroupTyped<UserDTO>) {
        // todo fix with backend
        this.isLoading = true;
        const formValue = {
            language: form.value.language,
            darkTheme: form.value.darkTheme,
            phone: form.value.phone,
            profileImage: form.value.profileImage
        } as ChangeProfileDTO;
        this.userService.saveUser$(formValue).subscribe(_ => this.isLoading = false);
    }

    changePassword() {
        this.dialog.open(ChangePasswordDialogComponent, { });
    }

    changeDarkTheme(isDarkTheme: boolean) {
        this.darkTheme.setDarkTheme(isDarkTheme);
    }
}
