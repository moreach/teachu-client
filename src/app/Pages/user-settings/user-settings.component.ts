import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { SEXS } from "src/app/DTOs/xx_old/Enums/old_Sex";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordDialogComponent } from "./change-password-dialog/change-password-dialog.component";
import { UserService } from "./user.service";
import { ChangeProfileDTO } from "src/app/DTOs/xx_old/ChangeProfileDTO";
import { UserDTO } from "src/app/DTOs/xx_old/UserDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent {
    userForm: FormGroupTyped<UserDTO>;
    sexs = SEXS;
    isLoading: boolean = true;
    prevUser: ChangeProfileDTO | undefined;

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
            this.prevUser = {
                darkTheme: user.darkTheme,
                language: user.language,
                phone: user.phone,
                profileImage: user.profileImage,
            };
            this.isLoading = false;
        });
    }

    saveUser(form: FormGroupTyped<UserDTO>) {
        // todo fix profile image with new component
        this.isLoading = true;
        const formValue = {
            language: form.value.language,
            darkTheme: form.value.darkTheme,
            phone: form.value.phone,
            profileImage: 'chömmer d Vorarbet vom Micha is Backend merge?'
        } as ChangeProfileDTO;
        this.prevUser = formValue;
        this.userService.saveUser$(formValue).subscribe(_ => this.isLoading = false);
    }

    changePassword() {
        this.dialog.open(ChangePasswordDialogComponent, { });
    }

    changeDarkTheme(isDarkTheme: boolean) {
        // todo fix in backend
        this.darkTheme.setDarkTheme(isDarkTheme);
        const formValue = {
            ...this.prevUser,
            darkTheme: isDarkTheme,
        } as ChangeProfileDTO;
        this.prevUser = formValue;
        this.userService.saveUser$(formValue).subscribe();
    }
}
