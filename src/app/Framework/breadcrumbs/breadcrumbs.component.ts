import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BreadcrumbDTO } from 'src/app/DTOs/xx_old/BreadcrumbDTO';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  breadcrumbs$: Observable<BreadcrumbDTO[]>;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
  ) {
    this.breadcrumbs$ = this.breadcrumbsService.getBreadcrumbs();
  }

  navigateToRoute(path: string, url: BreadcrumbDTO[]) {
    let routerLink = [] as string[];
    let stop = false;
    for (let i = 0; (i < path.length && !stop); i++) {
      routerLink = [...routerLink, url[i].url];
      if (url[i].url === path) {
        stop = true;
      }
    }
    this.router.navigate(routerLink);
  }
}
