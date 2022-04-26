import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  
  constructor (
    private router: Router,
    private tokenService: TokenService,
  ) { }
  
  canActivate(): Observable<boolean> {
    const token = this.tokenService.getToken();
    return of(token).pipe(
      map(token => !!token),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate([appRoutes.Login])
        }
      }),
    );
  }
  
}
