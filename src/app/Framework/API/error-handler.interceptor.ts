import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { appConfig } from 'src/app/Config/appConfig';
import { endpoints } from 'src/app/Config/endpoints';
import { TokenDTO } from 'src/app/DTOs/Authentication/TokenDTO';
import { ApiService } from './api.service';
import { ErrorHandlingService } from './error-handling.service';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { ApiExtensionService } from './api-extension.service';
import { UserTokenDTO } from 'src/app/DTOs/User/UserTokenDTO';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  /** to avoid endless loop on 401 errors that come from other things than the auth system */
  private unauthorizedCount: number = 0;

  constructor(
    private api: ApiService,
    private extensionApi: ApiExtensionService,
    private errorHandler: ErrorHandlingService,
    private tokenService: TokenService,
  ) {}

  private cloneRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    const isExtensionCall = request.url.includes(environment.URL_LEARNZ_BACKEND);
    return request.clone({
      setHeaders: {
        [isExtensionCall ? appConfig.API_HEADER_EXTENSION_AUTHORIZATION : appConfig.API_HEADER_AUTHORIZATION]: `${isExtensionCall ? appConfig.API_HEADER_BEARER + ' ' : ''}${token}`
      }
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isExtensionBackend = request.url.includes(environment.URL_LEARNZ_BACKEND);
    const token = isExtensionBackend ? this.tokenService.getJWT() : this.tokenService.getToken();
    if (!!token) {
      request = this.cloneRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (this.tokenService.isExpired() || (error.status === 401 && error.url.split('/').includes(endpoints.Login))) {
          this.tokenService.removeToken();
          this.tokenService.removeRefreshToken();
          this.tokenService.removeExpired();
          this.errorHandler.redirectToLogin();
        }
        if (error.status === 401 && this.unauthorizedCount < appConfig.UNAUTHORIZED_ERROR_RETRY_COUNT) {
          if (isExtensionBackend) {
            this.unauthorizedCount++;
            return this.extensionApi.callApi<UserTokenDTO>(endpoints.UserRefreshToken, {
              token: this.tokenService.getRefreshToken(),
            } as UserTokenDTO, 'POST').pipe(
              tap(token =>  this.tokenService.setJWT(token.token)),
              switchMap(token => next.handle(this.cloneRequest(request, token.token))),
            );
          } else {
            this.unauthorizedCount++;
            return this.api.callApi<TokenDTO>(endpoints.Login, {
              refresh: this.tokenService.getRefreshToken(),
            } as TokenDTO, 'PUT').pipe(
              tap(token => {
                this.tokenService.setToken(token.access);
                this.tokenService.setRefreshToken(token.refresh);
                this.tokenService.setExpired(token.accessExpires);
              }),
              switchMap(token => next.handle(this.cloneRequest(request, token.access))),
            );
          }
        } else {
          return this.errorHandler.handleError({
            error,
            request
          });
        }
      }),
    );
  }
}
