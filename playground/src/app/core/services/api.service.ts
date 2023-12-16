import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseServiceUrl = environment.baseServiceUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0, max-age=0',
    }),
    withCredentials: false,
  };

  constructor(private http: HttpClient) {}

  getData<T>(url: string): Observable<T> {
    const params = new HttpParams().set('rnd', new Date().getTime().toString());
    return this.http.get<T>(`${this.baseServiceUrl}${url}`, {
      params: params,
      ...this.httpOptions,
    });
  }

  postData<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseServiceUrl}${url}`, data, this.httpOptions);
  }

  putData<T>(url: string, data?: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseServiceUrl}${url}`, data, this.httpOptions);
  }

  deleteData<T>(url: string): Observable<T> {
    return this.http.delete<T>( `${this.baseServiceUrl}${url}`, this.httpOptions);
  }
}
