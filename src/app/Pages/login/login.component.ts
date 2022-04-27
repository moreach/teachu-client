import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { endpoints } from 'src/app/Config/endpoints';
import { LoginDTO } from 'src/app/DTOs/LoginDTO';
import { TokenDTO } from 'src/app/DTOs/TokenDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { TokenService } from 'src/app/Framework/API/token.service';
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
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    }) as FormGroupTyped<LoginDTO>;

    const refreshToken = this.tokenService.getRefreshToken();
    if (!!refreshToken) {
      this.api.callApiWithError<TokenDTO>(endpoints.Login, {
        refreshToken
      }, 'PUT').subscribe(token => {
        if (typeof(token) !== 'string') {
          this.tokenService.setToken(token.access);
          this.tokenService.setRefreshToken(token.refresh);
          this.router.navigate([appRoutes.App, appRoutes.Ping]);
        } else {
          this.tokenService.removeToken();
          this.tokenService.removeRefreshToken();
        }
     })
    }
  }

  login() {
    this.api.callApiWithError<TokenDTO>(endpoints.Login, {
      ...this.form.value
    }, 'POST').subscribe(token => {
      if (typeof(token) !== 'string') {
        this.tokenService.setToken(token.access);
        this.tokenService.setRefreshToken(token.refresh);
        this.router.navigate([appRoutes.App, appRoutes.Ping]);
      } else {
        this.loginWrong = true;
      }
    });
  }
}
