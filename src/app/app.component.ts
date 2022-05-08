import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, Component } from '@angular/core';
import { DarkThemeService } from './Framework/dark-theme/dark-theme.service';
import { LanguagesService } from './Framework/Languages/languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'teachu';

  constructor (
    private languageService: LanguagesService,
    private darkTheme: DarkThemeService,
    private overlay: OverlayContainer,
  ) {
    this.languageService.setLanguageOnStartup();
    this.darkTheme.isDarkTheme$.asObservable().subscribe((isDarkTheme) => {
      this.setDarkTheme(isDarkTheme);
    });
  }

  ngAfterViewInit(): void {
    this.setDarkTheme(this.darkTheme.getDarkTheme());
  }

  setDarkTheme(isDarkTheme: boolean) {
    document.body.classList.toggle('darkTheme', isDarkTheme);
    if (isDarkTheme) {
          this.overlay.getContainerElement().classList.add('darkTheme');
      } else {
        this.overlay.getContainerElement().classList.remove('darkTheme');
      }
  }
}
