import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { endpoints } from 'src/app/Config/endpoints';
import { LoginDTO } from 'src/app/DTOs/Authentication/LoginDTO';
import { TokenDTO } from 'src/app/DTOs/Authentication/TokenDTO';
import { GetLanguageKey } from 'src/app/DTOs/Enums/Language';
import { ParentChildDTO } from 'src/app/DTOs/User/ParentChildDTO';
import { UserOwnDTO } from 'src/app/DTOs/User/UserOwnDTO';
import { UserTokenDTO } from 'src/app/DTOs/User/UserTokenDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { ApiService } from 'src/app/Framework/API/api.service';
import { ErrorHandlingService } from 'src/app/Framework/API/error-handling.service';
import { ParentService } from 'src/app/Framework/API/parent.service';
import { TokenService } from 'src/app/Framework/API/token.service';
import { DarkThemeService } from 'src/app/Framework/dark-theme/dark-theme.service';
import { LanguagesService } from 'src/app/Framework/Languages/languages.service';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroupTyped<LoginDTO>;
  loginWrong: boolean = false;

  constructor(
    private api: ApiService,
    private extensionApi: ApiExtensionService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private errorHandler: ErrorHandlingService,
    private darkThemeService: DarkThemeService,
    private languageService: LanguagesService,
    private parentService: ParentService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: '',
    }) as FormGroupTyped<LoginDTO>;

    if (this.tokenService.isExpired()) {
      this.tokenService.removeToken();
      this.tokenService.removeRefreshToken();
      this.tokenService.removeExpired();
      this.tokenService.removeJWT();
      this.errorHandler.redirectToLogin();
    }
    const refresh = this.tokenService.getRefreshToken();
    if (refresh) {
      this.api.callApi<TokenDTO>(endpoints.Login, {
        refresh
      }, 'PUT').subscribe(token => {
        this.tokenService.setToken(token.access);
        this.tokenService.setRefreshToken(token.refresh);
        this.tokenService.setExpired(token.accessExpires);
        this.router.navigate([appRoutes.App, appRoutes.Dashboard]);
      });
    }

    this.darkThemeService.setDarkTheme(this.darkThemeService.getDarkTheme());
  }

  login() {
    this.api.callApi<TokenDTO>(endpoints.Login, { ...this.form.value }, 'POST').pipe(
      switchMap(token => {
        return this.extensionApi.callApi<UserTokenDTO>(endpoints.UserRefreshToken, { token: token.access } as UserTokenDTO, 'POST').pipe(
          map(jwt => { return { token, jwt } })
        );
      }),
      tap(tokens => {
        this.setToken(tokens.token);
        this.setJWT(tokens.jwt.token);
      }),
      switchMap(_ => this.api.callApi<UserOwnDTO>(endpoints.User, { }, 'GET')),
      tap(user => this.setSettings(user)),
      switchMap(user => {
        if (user.role === 'parent') {
          return this.parentService.callParentEndpoint$();
        } else {
          return of(null);
        }
      }),
      tap(children => this.setChildren(children)),
    ).subscribe(_ => {
      this.router.navigate([appRoutes.App, appRoutes.Dashboard]);
    });
  }

  setToken(token: TokenDTO) {
    this.tokenService.setToken(token.access);
    this.tokenService.setRefreshToken(token.refresh);
    this.tokenService.setExpired(token.accessExpires);
  }

  setJWT(jwt: string) {
    this.tokenService.setJWT(jwt);
  };

  setSettings(user: UserOwnDTO) {
    this.darkThemeService.setDarkTheme(user.darkTheme);
    if (user.language) {
      this.languageService.selectLanguage(GetLanguageKey(user.language));
    }
    this.tokenService.setUserId(user.id)
  }

  setChildren(children: ParentChildDTO[] | null) {
    if (!!children) {
      this.parentService.setActiveStudent(children[0].id);
    } else {
      this.parentService.removeActiveStudent();
    }
  }
}
