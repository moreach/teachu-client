import { Injectable } from '@angular/core';
import { appConfig } from 'src/app/Config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(appConfig.APPLICATION_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(appConfig.APPLICATION_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(appConfig.APPLICATION_TOKEN);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(appConfig.APPLICATION_REFRESH_TOKEN, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(appConfig.APPLICATION_REFRESH_TOKEN);
  }

  removeRefreshToken() {
    localStorage.removeItem(appConfig.APPLICATION_REFRESH_TOKEN);
  }

  getSelectedLanguage() {
    return localStorage.getItem(appConfig.APPLICATION_LANGUAGE);
  }

  setSelectedLanguage(language: string) {
    localStorage.setItem(appConfig.APPLICATION_LANGUAGE, language);
  }
  
}
