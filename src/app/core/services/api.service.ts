import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Options } from '../../shared';
import { GlobalStateService } from '../../state';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private globalStateService = inject(GlobalStateService);
  constructor(private httpClient: HttpClient) {};

  // Used to make a GET request to the API
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  };

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage: string;

  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side or network error
  //     errorMessage = `Client-side error: ${error.error.message}`;
  //   } else {
  //     // Backend error
  //     errorMessage = `Server-side error: ${error.status} ${error.message}`;

  //     // Sanitize API key from error message
  //     if (/apiKey=/.test(errorMessage)) {
  //       errorMessage = 'An error occurred. Please try again later.';
  //     }
  //   }

  //   // console.error(errorMessage);
  //   // Log to console without exposing sensitive info
  //   console.error('API error:', error);

  //   // Update global state with sanitized error message
  //   this.globalStateService.setError(errorMessage);

  //   return throwError(() => new Error(errorMessage));
  // };
};
