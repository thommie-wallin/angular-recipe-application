import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalStateService } from '../../state';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStateService = inject(GlobalStateService);
  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (error.status === 401) {
          // Specific handling for unauthorized errors         
          globalStateService.setError(`Unauthorized request: ${error.message}`);
        } else {
          // Handle other HTTP error codes
          globalStateService.setError(`HTTP error: ${error.message}`);
        }
      } else {
        // Handle non-HTTP errors
        globalStateService.setError(`An error occurred: ${error.message}`);
      }
      return throwError(() => new Error(error.message));
    })
  );
};
