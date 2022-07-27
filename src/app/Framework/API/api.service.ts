import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  callApi<T>(endpoint: string, payload: any, method: HttpMethods) {
    const request = this.buildRequest(endpoint, payload, method);

    return request as Observable<T>;
  }

  private buildRequest(endpoint: string, payload: any, method: HttpMethods) {
    if(!environment.IS_PROD) console.log("api - sending request: ", endpoint, method, payload)
    const requestEndpoint = `${environment.URL_API}${endpoint}`;

    let request: any;
    switch (method) {
      case 'GET':
        request = this.http.get(requestEndpoint, payload);
        break;
      case 'POST':
        request = this.http.post(requestEndpoint, payload);
        break;
      case 'PUT':
        request = this.http.put(requestEndpoint, payload);
        break;
      case 'DELETE':
        request = this.http.delete(requestEndpoint, {
          body: payload
        });
        break;
    }

    return request;
  }
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
