import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appConfig } from 'src/app/Config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {

  isDarkTheme$ = new BehaviorSubject<boolean>(false);

  constructor() {}
  
  setDarkTheme(isDarkTheme: boolean) {
    localStorage.setItem(appConfig.APPLICATION_DARK_THEME, isDarkTheme.valueOf().toString());
    this.isDarkTheme$.next(isDarkTheme);
  }

  getDarkTheme(): boolean {
    const isDarkTheme = localStorage.getItem(appConfig.APPLICATION_DARK_THEME);
    if (!isDarkTheme) {
      return false;
    }
    return isDarkTheme === 'true';
  }
}
