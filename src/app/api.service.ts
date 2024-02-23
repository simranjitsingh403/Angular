import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router,private http: HttpClient,private spinnerService: NgxSpinnerService) {
     
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    get<T>(url: string, serverURL?: string): Observable<T> {
      this.spinnerService.show();
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.getJwtToken()});
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
        return  this.http.get<T>(serverURL + url, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      post<T>(url: string, data: any, isLoginHeader?: boolean, serverURL?: string, fileInput?:boolean): Observable<T> {
        this.spinnerService.show();
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.getJwtToken() });
        if (isLoginHeader) {
          headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.getJwtToken() });
        }
        if(fileInput){
          headers = new HttpHeaders({'Authorization':'Bearer ' + this.getJwtToken()});
        }
    
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
        return this.http.post<T>(serverURL + url, data, { headers }).pipe(catchError(this.handleError));
      }
    
      put<T>(url: string, data?: any, isLoginHeader?: boolean, serverURL?: string, fileInput?:boolean): Observable<T> {
        this.spinnerService.show();
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.getJwtToken() });
        if (isLoginHeader) {
          headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.getJwtToken() });
        }
        if(fileInput){
          headers = new HttpHeaders();
        }
    
        if (serverURL === undefined) {
          serverURL = environment.baseURL;
        }
    
        return this.http.put<T>(serverURL + url, data, { headers }).pipe(catchError(this.handleError));
      }

      private handleError(error: HttpErrorResponse) {
        this.spinnerService.hide();
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
        } 
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('offline...!'));
      }

      getJwtToken(){
        return localStorage.getItem('token');
      }

}
