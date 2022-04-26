import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ErrorDTO } from 'src/app/DTOs/ErrorDTO';
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

  callApiWithError<T>(endpoint: string, payload: any, method: HttpMethods) {
    const request = this.buildRequest(endpoint, payload, method);

    return (request as Observable<T | ErrorDTO>).pipe(
      map(result => {
        const error = result as ErrorDTO;
        if (!error) {
          return null;
        }
        if (error.errorKey !== undefined) {
          return 'error.' + error.errorKey;
        } else {
          return result as T;
        }
      }),
    ) as Observable<T | string>;
  }

  private buildRequest(endpoint: string, payload: any, method: HttpMethods) {
    const requestEndpoint = `${environment.URL_API}${endpoint}`;
  
    let params = {};
    if ((method === 'GET' || method === 'DELETE') && !!payload) {
      if (typeof payload === 'string') {
        params = new HttpParams().set('id', payload);
      } else if (Object.keys(payload).length > 1) {
        params = payload;
      }
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
