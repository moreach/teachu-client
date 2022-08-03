import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordDialogComponent } from "./change-password-dialog/change-password-dialog.component";
import { UserService } from "./user.service";
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import { UserOwnChangeDTO } from "src/app/DTOs/User/UserOwnChangeDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit{
    userForm: FormGroupTyped<UserOwnDTO>;
    isLoading: boolean = true;
    prevUser: UserOwnChangeDTO | undefined;
    profileImageControl: FormControl;
    uploadedProfileImage: File | undefined;

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
        }) as FormGroupTyped<UserOwnDTO>;
        this.userService.getCurrentUser$().subscribe((user) => {
            this.darkTheme.setDarkTheme(user.darkTheme);
            this.userForm.patchValue({
                ...user,
                birthday: new Date(user.birthday),
            } as UserOwnDTO);
            this.prevUser = {
                darkTheme: user.darkTheme,
                language: user.language,
                phone: user.phone,
            };
            this.isLoading = false;
        });

        this.profileImageControl = new FormControl(this.uploadedProfileImage, [
            Validators.required,
        ]);
    }

    ngOnInit() {
        this.profileImageControl.valueChanges.subscribe(file => {
            this.uploadedProfileImage = file.files[0];
            console.log(this.uploadedProfileImage)

            if(this.uploadedProfileImage)
                this.userService.saveProfileImage$(this.uploadedProfileImage).subscribe(_ => location.reload());
        });
    }

    saveUser(form: FormGroupTyped<UserOwnDTO>) {
        this.isLoading = true;
        const formValue = {
            language: form.value.language,
            darkTheme: form.value.darkTheme,
            phone: form.value.phone,
        } as UserOwnChangeDTO;
        this.prevUser = formValue;
        this.userService.saveUser$(formValue).subscribe(_ => this.isLoading = false);
    }

    changePassword() {
        this.dialog.open(ChangePasswordDialogComponent, { });
    }

    changeDarkTheme(isDarkTheme: boolean) {
        this.darkTheme.setDarkTheme(isDarkTheme);
        const formValue = {
            ...this.prevUser,
            darkTheme: isDarkTheme,
        } as UserOwnChangeDTO;
        this.prevUser = formValue;
        this.userService.saveUser$(formValue).subscribe();
    }
}
