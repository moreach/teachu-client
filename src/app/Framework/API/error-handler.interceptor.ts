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
        if (this.tokenService.isExpired() || (error.url as string).split('/').some(u => u === endpoints.Login)) {
          this.tokenService.removeToken();
          this.tokenService.removeRefreshToken();
          this.errorHandler.redirectToLogin();
        }

        if (error.status === 401) {
          return this.api.callApi<TokenDTO>(endpoints.Login,  {
            refresh: this.tokenService.getRefreshToken(),
          } as TokenDTO, 'PUT').pipe(
            tap(token => {
              this.tokenService.setToken(token.access);
              this.tokenService.setRefreshToken(token.refresh);
              this.tokenService.setExpired(token.refreshExpires);
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
    )
  }
}
