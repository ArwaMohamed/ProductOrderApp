import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:3000/';
  constructor() { }
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.basePath+url);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.basePath+url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.basePath+url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.basePath+url);
  }
}
