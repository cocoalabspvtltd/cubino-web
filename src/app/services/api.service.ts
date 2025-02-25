import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';

declare var localStorage: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL = 'https://cocoalabs.in/Cubino-Backend/public';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Helper to get headers with token (if available)
  private getHeaders(): { headers: HttpHeaders } {
    let loginToken = '';
    if (isPlatformBrowser(this.platformId)) {
      loginToken = localStorage.getItem('token') || '';
      console.log('Retrieved token:', loginToken);
    }
    
    // Prepare headers config
    const headersConfig: { [header: string]: string } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Only include the Authorization header if a token exists
    if (loginToken) {
      headersConfig['Authorization'] = `Bearer ${loginToken}`;
    } else {
      console.warn('No token found in localStorage.');
    }
    
    const headers = new HttpHeaders(headersConfig);
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
      .pipe(catchError(this.handleError));
  }

  // Logout User
  public logout(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/logout`, {}, this.getHeaders())
      .pipe(catchError(this.handleError));
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
    
    if (data.room_limit) {
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
    return this.http.delete<any>(`${this.BASE_URL}/api/booking/cancel/` + id, this.getHeaders())
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
  // Cubino for Business
  public business(data: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/register/bussiness-contact`, data, this.getHeaders())
      .pipe(catchError(this.handleError));
  }
  // Cubino for Travel Agent Register
  public travelAgent(data: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/register/agent`, data, this.getHeaders())
      .pipe(catchError(this.handleError));
  }

  // Cubino for Travel Agent Login
  public agentlogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/agent/login`, data, this.getHeaders())
     
  }
 // Property enquiry
 public listproperty(data: any): Observable<any> {
  return this.http.post<any>(`${this.BASE_URL}/api/property-enquiry`, data, this.getHeaders())
    .pipe(catchError(this.handleError));
}
// AGENT
public agentearnings(agentId: any): Observable<any> {
  return this.http.get<any>(`${this.BASE_URL}/api/agent/earnings/`+agentId,  this.getHeaders())
    .pipe(catchError(this.handleError));
}




private handleError = (error: HttpErrorResponse) => {
  console.error(`API Error [${error.status}]:`, error);
  let errorMessage = 'An unknown error occurred!';

  if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
    errorMessage = `Client Error: ${error.error.message}`;
  } else {
    switch (error.status) {
      case 401:
        errorMessage = 'Unauthorized access. Redirecting to login page...';
        this.router.navigate(['/login']);
        break;
      case 404:
        errorMessage = error.error.message || 'Resource not found.';
        break;
      case 422:
        errorMessage = error.error.message || 'Validation error.';
        if (error.error.errors) {
          errorMessage += Object.entries(error.error.errors)
            .map(([field, messages]) => `\n${field}: ${(messages as string[]).join(', ')}`)
            .join('');
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
  return throwError(() => new Error(errorMessage));
};

}
