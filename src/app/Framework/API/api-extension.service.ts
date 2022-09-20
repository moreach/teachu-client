import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiExtensionService {
  constructor(
    private http: HttpClient,
  ) { }

  callApi<T>(endpoint: string, payload: any, method: HttpMethods) {
    const request = this.buildRequest(endpoint, payload, method);

    return request as Observable<T>;
  }

  callFileUpload(endpoint: string, formData: FormData) {
    const requestEndpoint = `${environment.URL_LEARNZ_BACKEND}${endpoint}`;
    return this.http.post(requestEndpoint, formData, {reportProgress: true, observe: 'events' });
  }

  callFileDownload(endpoint: string, params: any) {
    const requestEndpoint = `${environment.URL_LEARNZ_BACKEND}${endpoint}`;
    return this.http.get(requestEndpoint, { params, reportProgress: true, observe: 'events', responseType: 'blob' });
  }

  private buildRequest(endpoint: string, payload: any, method: HttpMethods) {
    const requestEndpoint = `${environment.URL_LEARNZ_BACKEND}${endpoint}`;

    let params = {};
    if ((method === 'GET' || method === 'DELETE') && !!payload) {
      params = payload;
    }

    let request: any;
    switch (method) {
      case 'GET':
        request = this.http.get(requestEndpoint, { params });
        break;
      case 'POST':
        request = this.http.post(requestEndpoint, payload);
        break;
      case 'PUT':
        request = this.http.put(requestEndpoint, payload);
        break;
      case 'DELETE':
        request = this.http.delete(requestEndpoint, { params });
        break;
    }

    return request;
  }
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
