import {OverlayContainer} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {BehaviorSubject, startWith} from 'rxjs';
import {appConfig} from 'src/app/Config/appConfig';

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

  getDarkTheme$() {
    return this.isDarkTheme$.asObservable().pipe(
      startWith(this.getDarkTheme()),
    );
  }

  applyDarkTheme(isDarkTheme: boolean) {
    document.body.classList.toggle('darkTheme', isDarkTheme);
    this.overlay.getContainerElement().classList.toggle('darkTheme', isDarkTheme);

    const styles: string[] = [
      'base-0',
      'base-1',
      'base-2',
      'base-3',
      'base-4',
      'base-5',
      'primary-0',
      'primary-1',
      'primary-2',
      'primary-3',
      'primary-4',
      'primary-5',
      'secondary-0',
      'secondary-1',
      'secondary-2',
      'secondary-3',
      'secondary-4',
      'secondary-5',
      'error-0',
    ];
    const setTo: string = isDarkTheme ? 'dark' : 'light';
    let r = document.querySelector(':root') as HTMLElement;
    let computed = getComputedStyle(r);

    styles.forEach(style => {
      let newColor = computed.getPropertyValue(`--teachu-${setTo}-${style}`);
      r.style.setProperty(`--teachu-${style}`, newColor);
    });
  }
}
