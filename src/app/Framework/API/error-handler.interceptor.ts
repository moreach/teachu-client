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
import { TokenDTO } from 'src/app/DTOs/xx_old/TokenDTO';
import { ApiService } from './api.service';
import { ErrorHandlingService } from './error-handling.service';
import { TokenService } from './token.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  /** to avoid endless loop on 401 errors that come from other things than the auth system */
  private unauthorizedCount: number = 0;

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
        if (this.tokenService.isExpired()) {
          this.tokenService.removeToken();
          this.tokenService.removeRefreshToken();
          this.tokenService.removeExpired();
          this.errorHandler.redirectToLogin();
        }
        if (error.status === 401 && this.unauthorizedCount < appConfig.UNAUTHORIZED_ERROR_RETRY_COUNT) {
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
