import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, map, filter, startWith, distinctUntilChanged } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { endpoints } from 'src/app/Config/endpoints';
import { ChangeProfileDTO } from 'src/app/DTOs/xx_old/ChangeProfileDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import {UserOwnDTO} from "../../DTOs/User/UserOwnDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: Observable<UserOwnDTO> | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  getCurrentUser$(): Observable<UserOwnDTO> {
    if(this.currentUser) return this.currentUser;
    this.currentUser = this.apiService.callApi<UserOwnDTO>(endpoints.User, {}, 'GET');
    return this.currentUser;
  }

  saveUser$(formValue: ChangeProfileDTO) {
    return this.apiService.callApi(endpoints.User, formValue, "PUT").subscribe(() => {
      this.currentUser = undefined;
      this.getCurrentUser$();
    });
  };

  saveProfileImage$(image: File): Observable<any>{
      const formData: FormData = new FormData();
      formData.append("file", image)
      return this.apiService.callApi(endpoints.User, formData, 'POST');
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
