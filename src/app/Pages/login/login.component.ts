import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { endpoints } from 'src/app/Config/endpoints';
import { LoginDTO } from 'src/app/DTOs/Authentication/LoginDTO';
import { TokenDTO } from 'src/app/DTOs/Authentication/TokenDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { ErrorHandlingService } from 'src/app/Framework/API/error-handling.service';
import { TokenService } from 'src/app/Framework/API/token.service';
import { DarkThemeService } from 'src/app/Framework/dark-theme/dark-theme.service';
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
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private errorHandler: ErrorHandlingService,
    private darkThemeService: DarkThemeService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: '',
    }) as FormGroupTyped<LoginDTO>;

    if (this.tokenService.isExpired()) {
      this.tokenService.removeToken();
      this.tokenService.removeRefreshToken();
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
    this.api.callApi<TokenDTO>(endpoints.Login, {
      ...this.form.value
    }, 'POST').subscribe(token => {
      this.tokenService.setToken(token.access);
      this.tokenService.setRefreshToken(token.refresh);
      this.tokenService.setExpired(token.accessExpires);
      this.router.navigate([appRoutes.App, appRoutes.Dashboard]);
    });
  }
}
