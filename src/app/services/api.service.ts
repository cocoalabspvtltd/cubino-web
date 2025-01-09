import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
// var loginToken = localStorage.getItem('token');
// console.log(loginToken)
// const httpOptions = {
//   headers: new HttpHeaders({
//        Authorization: 'Bearer ' + loginToken,
//   }),
// };

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL = '  https://fc00-117-231-178-109.ngrok-free.app';
  constructor(private http: HttpClient,private router: Router) {}
    
    // Method to get common headers
    private getHeaders(): { headers: HttpHeaders } {
      
      const headers = new HttpHeaders({
      //  Authorization: `Bearer ${loginToken}`,
       'ngrok-skip-browser-warning': '69420',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     });
  
      return { headers };
    }
  
//=================================register===========================================================//
public register(data:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.post<any>(this.BASE_URL + `/api/register`,data,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//=================================Login===========================================================//
public Login(data:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.post<any>(this.BASE_URL + `/api/login`,data,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//=================================Send OTP===========================================================//
public OTP(data:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.post<any>(this.BASE_URL + `/api/verify-otp`,data,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//===================================States=========================================================//
public States():Observable<any>{
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/states`,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }

//===================================Send otp=========================================================//
public Send_otp(data:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.post<any>(this.BASE_URL + `/api/send-otp`,data,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//=======================================Popular Cities==============================================//
public Popular_Cities():Observable<any>{
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/popular-cities`,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//====================================Listunder main city============================================//
public list_Cities(id:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/places/`+id,this.getHeaders()).pipe(
      catchError(this.handleError) // Use catchError to handle errors
    );
 }
//====================================hotels list on citites========================================//
public city_hotels(id:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/places/`+id,this.getHeaders())
 }
//===================================rooms=====================================================//
public rooms(id:any):Observable<any>{
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/hotel-rooms?city=`+id,this.getHeaders())
 }
 
//==================================================================================//

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
        this.router.navigate(['/login']); // Redirect to login
        break;

      case 404:
        errorMessage = error.error.message || 'Resource not found.';
        break;

      case 422:
        errorMessage = 'Validation failed: ';
        if (error.error.errors) {
          const validationErrors = error.error.errors;
          for (const field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
              errorMessage += `\n${field}: ${validationErrors[field].join(', ')}`;
            }
          }
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

  // Log the error for debugging
  console.error('Error occurred:', {
    status: error.status,
    message: errorMessage,
    errorDetails: error.error,
  });

  // Optionally, display the error message in the UI (e.g., toast, snackbar)
  // this.showErrorNotification(errorMessage);

  // Throw the error message
  return throwError(() => new Error(errorMessage));
}

// // Helper method to display notifications
// private showErrorNotification(message: string) {
//   // Example implementation: Use a toast/snackbar service
//   this.toastService.showError(message); // Replace with your actual notification logic
// }













// Error handling method
// private handleError(error: HttpErrorResponse) {
//   let errorMessage = 'An unknown error occurred!';

//   if (error.error instanceof ErrorEvent) {
//     // Client-side error
//     errorMessage = `Error: ${error.error.message}`;
//   } else {
//     // Server-side error
//     switch (error.status) {
//       case 401:
//         // Unauthorized error
//         errorMessage = 'Unauthorized access. Redirecting to login page...';
//         this.router.navigate(['/login']);  // Redirect to login
//         break;

//       case 422:
//         // Validation error (Unprocessable Entity)
//         errorMessage = 'Validation failed: ';
//         if (error.error.errors) {
//           // Display detailed validation messages from the server if available
//           const validationErrors = error.error.errors;
//           for (const field in validationErrors) {
//             if (validationErrors.hasOwnProperty(field)) {
//               errorMessage += `\n${field}: ${validationErrors[field].join(', ')}`;
//             }
//           }
//         } else {
//           errorMessage += error.error.message || 'Invalid input.';
//         }
//         break;

//       case 500:
//         // Internal server error
//         errorMessage = 'Internal Server Error. Please try again later.';
//         break;

//       case 404:
//         // Not found error
//         errorMessage = 'Resource not found.';
//         break;

//       default:
//         // Generic message for other errors
//         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//         break;
//     }
//   }

//   // Log the error message or show it to the user
//   console.error(errorMessage);
//   // Optionally, show a user-friendly message in the UI



  
//   return throwError(() => errorMessage);
// }
}
