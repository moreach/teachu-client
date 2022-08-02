import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {appRoutes} from "../../Config/appRoutes";

@Component({
    selector: 'app-profile-pic',
    templateUrl: './profile-pic.component.html',
    styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent {

    @Input() width: number = 60;
    @Input() height: number = 60;
    @Input() profileImage: string | undefined;
    @Input() enableMoveToProfile: boolean = true;

    constructor(private router: Router) { }

    navigateToProfile() {
        if(this.enableMoveToProfile)
            this.router.navigate([appRoutes.App, appRoutes.UserSettings]).then();
    }

    getProfilePicId(): string {
        if (!!this.profileImage) {
            return this.profileImage;
        }
        return "";
    }
}
