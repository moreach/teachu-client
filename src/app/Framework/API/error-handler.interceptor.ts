import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { appConfig } from 'src/app/Config/appConfig';
import { endpoints } from 'src/app/Config/endpoints';
import { RefreshTokenDTO } from 'src/app/DTOs/RefreshTokenDTO';
import { TokenDTO } from 'src/app/DTOs/TokenDTO';
import { ApiService } from './api.service';
import { ErrorHandlingService } from './error-handling.service';
import { TokenService } from './token.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private api: ApiService,
    private errorHandler: ErrorHandlingService,
    private tokenService: TokenService,
  ) {}

  private cloneRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        [appConfig.API_HEADER_AUTHORIZATION]: `${token}`
      }
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (!!token) {
      request = this.cloneRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.api.callApi<TokenDTO>(endpoints.Refresh,  {
            refreshToken: this.tokenService.getRefreshToken() 
          } as RefreshTokenDTO, 'POST').pipe(
            tap(token => {
              if (typeof(token) !== 'string') {
                this.tokenService.setToken(token.token);
                this.tokenService.setRefreshToken(token.refreshToken);
              } else {
                this.tokenService.removeToken();
                this.tokenService.removeRefreshToken();
                this.errorHandler.redirectToLogin();
              }
            }),
            switchMap(token => next.handle(this.cloneRequest(request, (typeof(token) !== 'string' ? token.token : '')))),
          );
        } 
        // todo check for payload contains errorKey -> return key
        // test this
        // else if (!!error.payload?.errorKey) {
        //   return of(error.payload.errorKey)
        // }
        else {
          console.log(error)
          return this.errorHandler.handleError({
            error,
            request
          });
        }
      }),
    )
  }
}
