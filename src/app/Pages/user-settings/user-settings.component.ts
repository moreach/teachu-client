import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./user.service";
import {debounceTime, skip, Subject, switchMap, takeUntil} from "rxjs";
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import {UserOwnChangeDTO} from "../../DTOs/User/UserOwnChangeDTO";

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
    private uploadedProfileImage: File | undefined;
    private phoneSavedTimeout: number | undefined;
    private darkThemeSubject: Subject<boolean> = new Subject<boolean>();

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
            debounceTime(this.DEBOUNCE_TIME),
            switchMap(value => this.savePhoneNumber(value)),
            takeUntil(this.unsubscribe)
        ).subscribe(() => { });

        this.darkThemeSubject.asObservable().pipe(
            debounceTime(this.DEBOUNCE_TIME),
            switchMap(async (value) => this.saveDarkTheme(value)),
            takeUntil(this.unsubscribe)
        ).subscribe(() => { });
    }

    savePhoneNumber(newNumber: string): string{
        this.user!.phone = newNumber;
        this.saveUser();
        this.showPhoneSaved = true;
        this.phoneSavedTimeout = setTimeout(() => this.showPhoneSaved = false, 3500);
        this.unsubscribe.next();
        return newNumber;
    }

    toggleDarkTheme(){
        this.darkTheme = !this.darkTheme;
        this.darkThemeSubject.next(this.darkTheme);
        this.darkThemeService.setDarkTheme(this.darkTheme);
    }

    private saveDarkTheme(darkTheme: boolean): boolean {
        this.user!.darkTheme = darkTheme;
        this.saveUser();
        this.unsubscribe.next();
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

    ngOnDestroy() {
        this.unsubscribe.complete();
    }
}
