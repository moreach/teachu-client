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

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  getCurrentUser$(): Observable<UserOwnDTO> {
    return this.apiService.callApi<UserOwnDTO>(endpoints.User, {}, 'GET');
  }

  saveUser$(formValue: ChangeProfileDTO) {
    return this.apiService.callApi(endpoints.UserProfile, formValue, "PUT");
  };

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
