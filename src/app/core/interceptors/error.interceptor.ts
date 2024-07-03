import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalStateService } from '../../state';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const globalStateService = inject(GlobalStateService);

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       let errorMessage = 'An error occurred in interceptor';

//       console.log(error);
      
      
//       if (error.error instanceof ErrorEvent) {
//         // Client-side error
//         errorMessage = `Error: ${error.error.message}`;
//       } else {
//         // Server-side error
//         if (error.status === 404) {
//           errorMessage = 'Resource not found';
//         } else if (error.status === 500) {
//           errorMessage = 'Internal server error';
//         } else if (error.status === 401) {
//           errorMessage = 'Unauthorized access';
//         }
//         // Handle other status codes as needed
//         else {
//           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//         }
//       }

//       // Sanitize error message to avoid exposing sensitive info
//       const sanitizedErrorMessage = sanitizeErrorMessage(error.message);

//       // Log sanitized error message to the console for debugging
//       console.error('Sanitized API error:', sanitizedErrorMessage);

//       // Update global state with sanitized error message
//       globalStateService.setError(errorMessage);

//       return throwError(() => new Error(sanitizedErrorMessage));
//       // return EMPTY
//     })
//   );

//   function sanitizeErrorMessage(message: string): string {
//     // Remove API keys or other sensitive info from the error message
//     if (/apiKey=/.test(message)) {
//       return message.replace(/apiKey=\w+/g, 'apiKey=***');
//     }
//     if (/app_key=/.test(message)) {
//       const errMsg = message.replace(/app_key=\w+/g, 'app_key=***');
//       return errMsg.replace(/app_id=\w+/g, 'app_id=***');
//     }
//     return message;
//   };
// };





export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const globalStateService = inject(GlobalStateService);

  return next(req).pipe(
  //   tap(event => {
  //   console.log(event);
    
  //   if (event.type === HttpEventType.Response) {
  //     console.log(req.url, 'returned a response with status', event.status);
  //   }
  // })

    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred in interceptor';

      // console.log(error);
      
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.message}`;
      } else {
        // Server-side error
        if (error.status === 404) {
          errorMessage = 'Resource not found';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized access';
        }
        // Handle other status codes as needed
        else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      // Sanitize error message to avoid exposing sensitive info
      const sanitizedErrorMessage = sanitizeErrorMessage(error.message);

      // Log sanitized error message to the console for debugging
      console.error('Sanitized API error:', sanitizedErrorMessage);

      // Update global state with sanitized error message
      globalStateService.setError(errorMessage);

      return throwError(() => new Error(sanitizedErrorMessage));
      // return EMPTY
    })
  );

  function sanitizeErrorMessage(message: string): string {
    // Remove API keys or other sensitive info from the error message
    if (/apiKey=/.test(message)) {
      return message.replace(/apiKey=\w+/g, 'apiKey=***');
    }
    if (/app_key=/.test(message)) {
      const errMsg = message.replace(/app_key=\w+/g, 'app_key=***');
      return errMsg.replace(/app_id=\w+/g, 'app_id=***');
    }
    return message;
  };
};
