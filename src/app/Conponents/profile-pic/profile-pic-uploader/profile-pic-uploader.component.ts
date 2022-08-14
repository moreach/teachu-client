import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../../Pages/user-settings/user.service";

export interface FileUploadResponse{
    message: string;
    progress: number;
}

@Component({
    selector: 'app-profile-pic-uploader',
    templateUrl: './profile-pic-uploader.component.html',
    styleUrls: ['./profile-pic-uploader.component.scss']
})
export class ProfilePicUploaderComponent {
    private readonly SUPPORTED_IMAGE_TYPES: string[] = ["image/png", "image/jpeg"];
    private readonly ONE_MB: number = 1048576;

    @Input() buttonText: string = "Upload";
    @Input() buttonLabel: string = "";
    @Input() buttonHeight: string = "40px";
    @Input() buttonWidth: string = "200px";
    @Output() done: EventEmitter<void> = new EventEmitter<void>();

    progress: number = 100;
    hasError: boolean = false;

    constructor(
        private userService: UserService,
    ) { }

    uploadProfileImage(event: any){
        this.hasError = false;

        const image: File = event.target.files[0];
        if(!image){
            this.buttonLabel = "userSettings.profileImage.validation.notFound";
            this.hasError = true;
        }else if(!this.SUPPORTED_IMAGE_TYPES.includes(image.type)){
            this.buttonLabel = "userSettings.profileImage.validation.notSupportedType";
            this.hasError = true;
        }else if(image.size >= this.ONE_MB){
            this.buttonLabel = "userSettings.profileImage.validation.toBig";
            this.hasError = true;
        }else{
            this.userService.saveProfileImage$(image).subscribe({
                next: (res: FileUploadResponse) => this.update(res.progress, res.message),
                error: (err) => {
                    this.hasError = true;
                    this.update(err.progress, err.message);
                },
                complete: () => {
                    this.progress = 100;
                    this.done.emit()
                }
            });
        }
    }

    private update(curProgress: number, curMsg: string){
        this.progress = curProgress;
        if(!!this.buttonLabel)
            this.buttonLabel = curMsg;
    }
}
