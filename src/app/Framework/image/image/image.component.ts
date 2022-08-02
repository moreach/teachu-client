import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ApiService} from "../../API/api.service";
import {endpoints} from "../../../Config/endpoints";

@Component({
    selector: 'app-image[imageId]',
    templateUrl: './image.component.html'
})
export class ImageComponent {

    @ViewChild("image") imageElement!: ElementRef;

    @Input() secure: boolean = true;
    @Input() imageStyle: string = "";
    image: any = "assets/images/default-profile-image.jpg";
    private _imageId: string = "assets/images/default-profile-image.jpg";

    private fileReader: FileReader = new FileReader();

    constructor(
        private api: ApiService,
    ) {
        this.fileReader.addEventListener("load", () => {
            this.image = this.fileReader.result;
        }, false);
    }

    get imageId(): string {
        return this._imageId;
    }

    @Input() set imageId(id: string) {
        if(!!id) {
            this._imageId = id;
            this.api.callApi<Blob>(endpoints.Image + "/" + id, {responseType: "blob"}, "GET").subscribe(imageBlob => {
                this.fileReader.readAsDataURL(imageBlob);
            });
        }
    }
}
