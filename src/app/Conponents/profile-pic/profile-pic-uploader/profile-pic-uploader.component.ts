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

    //TODO validate file size and type & test error handling
    uploadFile(event: any){
        this.hasError = false;
        console.log(event)
        let files: FileList = event.target.files;
        if(files[0]){
            this.userService.saveProfileImage$(files[0]).subscribe({
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
