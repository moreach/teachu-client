import {Component} from "@angular/core";
import {ApiService} from "../../Framework/API/api.service";
import {endpoints} from "../../Config/endpoints";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupTyped} from "../../Material/types";
import {UserDTO} from "../../DTOs/UserDTO";

@Component({
    selector: "user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent {
    userForm: FormGroupTyped<UserDTO>;

    constructor(
      private apiService: ApiService,
      private builder: FormBuilder,
    ) {
        this.userForm = this.builder.group({
            email: ["", Validators.email],
            password: [""],
            firstName: ["", Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])],
            lastName: ["", Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])],
            birthday: ["", Validators.required],
            sex: ["", Validators.required],
            language: ["", Validators.required],
            darkTheme: ["", Validators.required],
            city: ["", Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])],
            postalCode: ["", Validators.required],
            street: ["", Validators.required],
            phone: ["", Validators.required],
            profileImg: ["", Validators.required],
        }) as FormGroupTyped<UserDTO>;
        apiService.callApi(endpoints.User, {}, "GET").subscribe(
            (user) => this.userForm.patchValue(user as UserDTO));
    }


}
