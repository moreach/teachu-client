import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { UserService } from "./user.service";
import { skip, Subject, switchMap, takeUntil, throttleTime} from "rxjs";
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import {UserOwnChangeDTO} from "../../DTOs/User/UserOwnChangeDTO";
import { GetLanguage } from "src/app/DTOs/Enums/Language";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit, OnDestroy{
    private readonly DEBOUNCE_TIME: number = 2000; // in ms
    private unsubscribe = new Subject<void>()

    user: UserOwnDTO | undefined;

    showPhoneSaved: boolean = false;
    darkTheme: boolean = true;
    phoneNumberControl: FormControl;
    profileImageControl: FormControl;
    phoneSavedTimeout: number | undefined;
    private uploadedProfileImage: File | undefined;
    private darkThemeSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
      private darkThemeService: DarkThemeService,
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
            throttleTime(this.DEBOUNCE_TIME),
            switchMap(value => this.savePhoneNumber(value)),
            takeUntil(this.unsubscribe)
        ).subscribe();

        this.darkThemeSubject.asObservable().pipe(
            throttleTime(this.DEBOUNCE_TIME),
            switchMap(async (value) => this.saveDarkTheme(value)),
            takeUntil(this.unsubscribe)
        ).subscribe();
    }

    savePhoneNumber(newNumber: string): string{
        if (this.user) {
            this.user!.phone = newNumber;
            this.saveUser();
            this.showPhoneSaved = true;
            this.phoneSavedTimeout = setTimeout(() => this.showPhoneSaved = false, 3500);
            return newNumber;
        }
        return this.phoneNumberControl.value;
    }

    toggleDarkTheme(){
        this.darkTheme = !this.darkTheme;
        this.darkThemeSubject.next(this.darkTheme);
        this.darkThemeService.setDarkTheme(this.darkTheme);
    }

    private saveDarkTheme(darkTheme: boolean): boolean {
        if (this.user) {
            this.user!.darkTheme = darkTheme;
            this.saveUser();
        }
        return darkTheme;
    }

    profileImageUploaded(){
        location.reload();
    }

    saveUser(){
        if(this.user) {
            const userChanges: UserOwnChangeDTO = {
                language: this.user.language,
                darkTheme: this.user.darkTheme,
                phone: this.user.phone,
            }
            this.userService.saveUser$(userChanges);
        }
    }

    saveLanguage(language: string) {
        if (this.user) {
            this.user!.language = GetLanguage(language);
            this.saveUser();
        }
    }

    ngOnDestroy() {
        this.savePhoneNumber(this.phoneNumberControl.value);
        this.saveDarkTheme(this.darkTheme);
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
