import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appConfig } from 'src/app/Config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {

  isDarkTheme$ = new BehaviorSubject<boolean>(false);

  constructor(
    private overlay: OverlayContainer
  ) {}
  
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

  applyDarkTheme(isDarkTheme: boolean) {
    document.body.classList.toggle('darkTheme', isDarkTheme);
    this.overlay.getContainerElement().classList.toggle('darkTheme', isDarkTheme);

    const styles: string[] = ['primary', 'accent', 'white', 'grey', 'grey-darker', 'black', 'secondary', 'warn'];
    const setTo: string = isDarkTheme ? 'dark' : 'light';
    var r = document.querySelector(':root') as HTMLElement;
    var computed = getComputedStyle(r);

    styles.forEach(style => {
      var newColor = computed.getPropertyValue(`--teachu-${setTo}-${style}`);
      r.style.setProperty(`--teachu-${style}`, newColor);
    });
  }
}
