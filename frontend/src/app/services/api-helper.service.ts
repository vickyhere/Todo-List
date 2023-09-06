import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  get(endpoint: string): Observable<any> {
    const url = `${environment.baseUrl}${endpoint}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers ,withCredentials:true});
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${environment.baseUrl}${endpoint}`;
    const headers = this.getHeaders();
    return this.http.post(url, data, { headers ,withCredentials:true});
  }

  put(endpoint: string, data: any): Observable<any> {
    const url = `${environment.baseUrl}${endpoint}`;
    const headers = this.getHeaders();
    return this.http.put(url, data, { headers });
  }

  delete(endpoint: string): Observable<any> {
    const url = `${environment.baseUrl}${endpoint}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
