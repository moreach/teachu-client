import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {combineLatest, distinctUntilChanged, filter, map, Observable, startWith} from 'rxjs';
import {appRoutes} from 'src/app/Config/appRoutes';
import {endpoints} from 'src/app/Config/endpoints';
import {UserOwnChangeDTO} from 'src/app/DTOs/User/UserOwnChangeDTO';
import {ApiService} from 'src/app/Framework/API/api.service';
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";
import {FileUploadResponse} from "../../Conponents/profile-pic/profile-pic-uploader/profile-pic-uploader.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { UserExtensionProfileUploadDTO } from 'src/app/DTOs/User/UserExtensionProfileUploadDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: Observable<UserOwnDTO> | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private extensionApi: ApiExtensionService,
  ) { }

  getCurrentUser$(): Observable<UserOwnDTO> {
    if(this.currentUser) return this.currentUser;
    this.currentUser = this.apiService.callApi<UserOwnDTO>(endpoints.User, {}, 'GET');
    return this.currentUser;
  }

  getUserSubjects$(): Observable<UserExtensionProfileUploadDTO> {
    return this.extensionApi.callApi<UserExtensionProfileUploadDTO>(endpoints.UserProfile, {}, 'GET');
  }

  saveUser$(formValue: UserOwnChangeDTO, extensionForm: UserExtensionProfileUploadDTO) {
    const userForm$ = this.apiService.callApi(endpoints.User, formValue, 'PUT');
    const extensionForm$ = this.extensionApi.callApi(endpoints.UserProfile, extensionForm, 'POST');
    return combineLatest(
      userForm$,
      extensionForm$,
    ).subscribe(_ => {
      this.currentUser = undefined;
      this.getCurrentUser$();
    });
  };

  saveProfileImage$(image: File): Observable<FileUploadResponse>{
      let currentProgress: number = 0;
      let currentMessage: string = "Uploading...";

      const formData: FormData = new FormData();
      formData.append("file", image)

      return new Observable<FileUploadResponse>(obs => {
          this.apiService.callApi(endpoints.User, formData, 'POST', {
              reportProgress: true,
              responseType: 'json'
          }).subscribe({
              next: (httpEvent: any) => {
                  if(httpEvent.type === HttpEventType.UploadProgress && httpEvent.total){
                      currentProgress = Math.round(httpEvent.loaded / httpEvent.total * 100);
                  }else if(httpEvent instanceof HttpResponse) {
                      currentMessage = httpEvent.body.message;
                  }
                  obs.next({ message: currentMessage, progress: currentProgress })
              },
              error: (e) => {
                  currentProgress = 0;
                  if(e.error.error) currentMessage = e.error.error;
                  else currentMessage = "File upload failed";
                  obs.error({ message: currentMessage, progress: currentProgress })
              },
              complete: () => obs.complete(),
          });
      })
  }

  isSignedIn$(): Observable<boolean>  {
    return this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).url),
        startWith(this.router.url),
        map(url => url.split('/').some(u => u.toLowerCase() === appRoutes.App)),
        distinctUntilChanged(),
    );
  }
}
