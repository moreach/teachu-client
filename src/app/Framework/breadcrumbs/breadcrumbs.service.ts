import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, of } from 'rxjs';
import { BreadcrumbDTO } from 'src/app/DTOs/xx_old/BreadcrumbDTO';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  breadcrumbs$: Observable<BreadcrumbDTO[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs$ = this.activatedRoute.url.pipe(
      map(url => url.map(segment => segment.path)),
      switchMap(url => this.loadBreadcrumbs$(url))
    );
  }

  getBreadcrumbs() {
    return this.breadcrumbs$;
  }

  loadBreadcrumbs$(url: string[]) {
    // todo imlpement from backend endpoint
    return of([{
      url: 'app',
      translation: 'home'
    }, {
      url: 'ping',
      translation: null
    }, {
      url: 'guid',
      translation: 'banana'
    }] as BreadcrumbDTO[]);
  }
}