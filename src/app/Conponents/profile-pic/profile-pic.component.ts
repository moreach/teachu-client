import {Component, Input} from '@angular/core';
import {UserDTO} from "../../DTOs/UserDTO";
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
    @Input() user: UserDTO | undefined;

    constructor(private router: Router) { }

    navigateToProfile() {
        this.router.navigate([appRoutes.App, appRoutes.UserSettings]).then();
    }

    getProfilePicUrl(): string {
        if (this.user) {
            let picUrl: string = this.user.profileImage;
            if(!!picUrl)
                return picUrl;
        }
        return "assets/images/default-profile-image.jpg";
    }
}
