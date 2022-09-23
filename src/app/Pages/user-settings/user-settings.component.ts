import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DarkThemeService } from "src/app/Framework/dark-theme/dark-theme.service";
import { UserService } from "./user.service";
import { skip, Subject, switchMap, takeUntil, throttleTime, combineLatest} from "rxjs";
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import {UserOwnChangeDTO} from "../../DTOs/User/UserOwnChangeDTO";
import { GetLanguage } from "src/app/DTOs/Enums/Language";
import { getSubjects } from "src/app/DTOs/Enums/Subject";
import { FormGroupTyped } from "src/app/Material/types";
import { UserExtensionProfileDTO } from "src/app/DTOs/User/UserExtensionProfileUploadDTO";
import { getGrades } from "src/app/DTOs/Enums/Grade";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit, OnDestroy{
    private readonly DEBOUNCE_TIME: number = 2000; // in ms
    private unsubscribe = new Subject<void>()

    user: UserOwnDTO | undefined;
    grades = getGrades();
    showPhoneSaved: boolean = false;
    darkTheme: boolean = true;
    profileImageControl: FormControl;
    phoneSavedTimeout: number | undefined;
    private uploadedProfileImage: File | undefined;
    private darkThemeSubject: Subject<boolean> = new Subject<boolean>();
    subjects = getSubjects();
    formGroup: FormGroupTyped<UserExtensionProfileDTO & { phoneNumber: string }>;

    constructor(
      private darkThemeService: DarkThemeService,
      private userService: UserService,
      private formBuilder: FormBuilder,
    ) {
        this.formGroup = this.formBuilder.group({
            phoneNumber: ['', Validators.required],
            goodSubject1: [null, Validators.required],
            goodSubject2: [null, Validators.required],
            goodSubject3: [null, Validators.required],
            badSubject1: [null, Validators.required],
            badSubject2: [null, Validators.required],
            badSubject3: [null, Validators.required],
            information: ['', Validators.required],
            grade: [null, Validators.required],
        }) as FormGroupTyped<UserExtensionProfileDTO & { phoneNumber: string }>;
        
        this.profileImageControl = new FormControl(this.uploadedProfileImage, [
            Validators.required,
        ]);

        this.darkTheme = darkThemeService.getDarkTheme();

        combineLatest(
            userService.getCurrentUser$(),
            userService.getUserSubjects$()
        ).subscribe(([user, subjects]) => {
            this.user = user;
            const value = {
                phoneNumber: user.phone,
                goodSubject1: subjects.goodSubject1,
                goodSubject2: subjects.goodSubject2,
                goodSubject3: subjects.goodSubject3,
                badSubject1: subjects.badSubject1,
                badSubject2: subjects.badSubject2,
                badSubject3: subjects.badSubject3,
                grade: subjects.grade,
                information: subjects.information,
            };
            this.formGroup.patchValue(value);
            this.formGroup.updateValueAndValidity();
        });
    }

    ngOnInit() {
        this.formGroup.valueChanges.pipe(
            skip(1), // skip the first because this change is when the user loaded
            throttleTime(this.DEBOUNCE_TIME),
            switchMap(value => this.savePhoneNumber(value.phoneNumber)),
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
            this.saveUser(this.formGroup.value);
            this.showPhoneSaved = true;
            this.phoneSavedTimeout = setTimeout(() => this.showPhoneSaved = false, 3500);
            return newNumber;
        }
        return this.formGroup.value['phoneNumber'];
    }

    toggleDarkTheme(){
        this.darkTheme = !this.darkTheme;
        this.darkThemeSubject.next(this.darkTheme);
        this.darkThemeService.setDarkTheme(this.darkTheme);
    }

    private saveDarkTheme(darkTheme: boolean): boolean {
        if (this.user) {
            this.user!.darkTheme = darkTheme;
            this.saveUser(this.formGroup.value);
        }
        return darkTheme;
    }

    profileImageUploaded(){
        location.reload();
    }

    saveUser(subjects: UserExtensionProfileDTO){
        if(this.user) {
            const userChanges: UserOwnChangeDTO = {
                language: this.user.language,
                darkTheme: this.user.darkTheme,
                phone: this.user.phone,
            }
            this.userService.saveUser$(userChanges, subjects);
        }
    }

    saveLanguage(language: string) {
        if (this.user) {
            this.user!.language = GetLanguage(language);
            this.saveUser(this.formGroup.value);
        }
    }

    ngOnDestroy() {
        this.savePhoneNumber(this.formGroup.value['phoneNumber']);
        this.saveDarkTheme(this.darkTheme);
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
