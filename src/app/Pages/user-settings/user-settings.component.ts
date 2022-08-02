import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./user.service";
import {debounceTime, skip, Subject, switchMap, takeUntil} from "rxjs";
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import {ChangeProfileDTO} from "../../DTOs/xx_old/ChangeProfileDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit, OnDestroy{
    private unsubscribe = new Subject<void>()

    user: UserOwnDTO | undefined;

    showPhoneSaved: boolean = false;
    darkTheme: boolean = true;
    phoneNumberControl: FormControl;
    profileImageControl: FormControl;
    private uploadedProfileImage: File | undefined;
    private phoneSavedTimeout: number | undefined;

    constructor(
      private builder: FormBuilder,
      private darkThemeService: DarkThemeService,
      private dialog: MatDialog,
      private userService: UserService,
    ) {
        this.phoneNumberControl = new FormControl('', [ Validators.required ]);
        this.profileImageControl = new FormControl(this.uploadedProfileImage, [
            Validators.required,
        ]);

        this.darkTheme = darkThemeService.getDarkTheme();

        userService.getCurrentUser$().subscribe(user => {
            this.user = user;
            this.phoneNumberControl.patchValue(user.phone);
        });
    }

    ngOnInit() {
        this.phoneNumberControl.valueChanges.pipe(
            skip(1), // skip the first because this change is when the user loaded
            debounceTime(2000),
            switchMap(value => this.savePhoneNumber(value)),
            takeUntil(this.unsubscribe)
        ).subscribe(() => { });

        this.profileImageControl.valueChanges.subscribe(file => {
            this.uploadedProfileImage = file.files[0];

            //TODO validate file size and type
            if(this.uploadedProfileImage)
                this.userService.saveProfileImage$(this.uploadedProfileImage).subscribe(_ => location.reload());
        });
    }

    // TODO check whether changing the password really resets the user
    savePhoneNumber(newNumber: string): string{
        this.user!.phone = newNumber;
        this.saveUser();
        this.showPhoneSaved = true;
        this.phoneSavedTimeout = setTimeout(() => this.showPhoneSaved = false, 3500);
        return newNumber;
    }

    // TODO implement some delay so that spamming does not send 100 requests
    toggleDarkMode(){
        this.darkTheme = !this.darkTheme;
        this.user!.darkTheme = this.darkTheme;
        this.darkThemeService.setDarkTheme(this.darkTheme);
        this.saveUser();
    }

    saveUser(){
        if(this.user) {
            const userChanges: ChangeProfileDTO = {
                language: this.user.language,
                darkTheme: this.user.darkTheme,
                phone: this.user.phone,
            }
            this.userService.saveUser$(userChanges);
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next()
    }
}
