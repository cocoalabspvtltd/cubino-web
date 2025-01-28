import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// var loginToken = localStorage.getItem('token');
// console.log(loginToken)
// const httpOptions = {
//   headers: new HttpHeaders({
//        Authorization: 'Bearer ' + loginToken,
//   }),
// };
declare var localStorage: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL = 'https://cocoalabs.in/Cubino';
  constructor(private http: HttpClient,private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
 
  
    // Helper to get headers with token
    private getHeaders(): { headers: HttpHeaders } {
      let loginToken = '';
      if (isPlatformBrowser(this.platformId)) {
        loginToken = localStorage.getItem('token') || '';
       // console.log('',loginToken )
      }
      
      const headers = new HttpHeaders({
        Authorization: `Bearer ${loginToken}`,
        //'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });  
      return { headers };
    }
  
    // Register User
    public register(data: any): Observable<any> {
      return this.http.post<any>(`${this.BASE_URL}/api/register`, data, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Login User
    public login(data: any): Observable<any> {
      return this.http.post<any>(`${this.BASE_URL}/api/login`, data, this.getHeaders())
        
    }
      // Login User
      public logout(): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/api/logout`, this.getHeaders())
          
      }


  
    // Send OTP
    public sendOtp(data: any): Observable<any> {
      return this.http.post<any>(`${this.BASE_URL}/api/verify-otp`, data, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get States
    public getStates(): Observable<any> {
      return this.http.get<any>(`${this.BASE_URL}/api/states`, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get Popular Cities
    public getPopularCities(): Observable<any> {
      return this.http.get<any>(`${this.BASE_URL}/api/popular-cities`, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get List of Cities under a Main City
    public listCities(id: any): Observable<any> {
      return this.http.get<any>(`${this.BASE_URL}/api/places/${id}`, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get Hotels List for a City
    public getCityHotels(id: any): Observable<any> {
      return this.http.get<any>(`${this.BASE_URL}/api/places/${id}`, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get Rooms based on Filters
    public getRooms(data: any): Observable<any> {
      let params = new HttpParams()
        .append('city', data.city)
        .append('guest_limit', data.guest_limit);
  
      if (data.search) {
        params = params.append('room_limit', data.room_limit);
      }
      if (data.start_date) {
        params = params.append('start_date', data.start_date);
      }
      if (data.end_date) {
        params = params.append('end_date', data.end_date);
      }
      if (data.search) {
        params = params.append('search', data.search);
      }
      if (data.search_places) {
        params = params.append('search_places', data.search_places);
      }
      return this.http.get<any>(`${this.BASE_URL}/api/hotel-rooms`, { headers: this.getHeaders().headers, params })
        .pipe(catchError(this.handleError));
    }
  
    // Room Booking
    public booking(data: any): Observable<any> {
      return this.http.post<any>(`${this.BASE_URL}/api/room-booking`, data, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Cancel Booking
    public cancel(id: any): Observable<any> {
      return this.http.delete<any>(`${this.BASE_URL}/api/booking/cancel/`+id, this.getHeaders())
        .pipe(catchError(this.handleError));
    }
  
    // Get Booked Rooms
    public getBookedRooms(): Observable<any> {
      return this.http.get<any>(`${this.BASE_URL}/api/booked-rooms`, this.getHeaders())
         .pipe(catchError(this.handleError));
    }
       // Get Cancelled Rooms
       public getCancelledRooms(): Observable<any> {
        return this.http.get<any>(`${this.BASE_URL}/api/cancelled-rooms`, this.getHeaders())
          .pipe(catchError(this.handleError));
      }
    
    // Handle Errors
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
  
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized access. Redirecting to login page...';
            this.router.navigate(['/login']);
            break;
  
          case 404:
            errorMessage = error.error.message || 'Resource not found.';
            break;
  
          case 422:
            errorMessage = 'Validation failed: ';
            if (error.error.errors) {
              Object.entries(error.error.errors).forEach(([field, messages]) => {
                errorMessage += `\n${field}: ${(messages as string[]).join(', ')}`;
              });
            } else {
              errorMessage += error.error.message || 'Invalid input.';
            }
            break;
  
          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            break;
  
          default:
            errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
            break;
        }
      }
  
     // console.error('Error occurred:', { status: error.status, message: errorMessage, errorDetails: error.error });
  
      return throwError(() => new Error(errorMessage));
    }
  }
  