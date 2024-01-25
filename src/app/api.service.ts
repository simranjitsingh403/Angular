import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router,private http: HttpClient) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    get<T>(url: string, serverURL?: string): Observable<T> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
        return  this.http.get<T>(serverURL + url, { headers });
      }
    
      post<T>(url: string, data: any, isLoginHeader?: boolean, serverURL?: string): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (isLoginHeader) {
          headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
        return this.http.post<T>(serverURL + url, data, { headers });
      }
    
      put<T>(url: string, data: any, isLoginHeader?: boolean, serverURL?: string): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (isLoginHeader) {
          headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
    
        return this.http.put<T>(serverURL + url, data, { headers });
      }

}
