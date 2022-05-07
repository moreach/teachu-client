import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { NavbarDTO, NavbarItemDTO } from 'src/app/DTOs/NavbarDTO';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  navBarItem$: Observable<NavbarDTO>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    // todo set backend endpoint
    const mockData = {
      rootElements: [
        { url: 'app/ping', translationKey: 'navbar.ping' } as NavbarItemDTO,
        { url: 'app/user', translationKey: 'navbar.user', children: [
          { url: 'app/ping', translationKey: 'navbar.ping' } as NavbarItemDTO,
          { url: 'app/ping', translationKey: 'navbar.ping' } as NavbarItemDTO,
        ] } as NavbarItemDTO,
      ]
    } as NavbarDTO;

    this.navBarItem$ = this.activatedRoute.url.pipe(
      distinctUntilChanged(),
      map(url => url.map(segment => segment.path)),
      switchMap(url => of(mockData))
    );
  }

  navigate(route: string) {
    this.router.navigate(route.split('/'));
  }
}
