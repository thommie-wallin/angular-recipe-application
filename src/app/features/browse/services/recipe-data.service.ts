import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Recipe, RecipeDetail } from '../models/recipe.model';
import { FilterState, RecipeApiInterface, RecipeFactoryService, SPOONACULAR_KEY_NAME } from '../../../core';
import { GlobalStateService } from '../../../state';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private factory = inject(RecipeFactoryService);
  private globalStateService = inject(GlobalStateService);
  private apiService: RecipeApiInterface;

  constructor() {
    // Default to spoonacular api.
    this.apiService = this.factory.getApiService(SPOONACULAR_KEY_NAME);
  }

  switchApi(apiName: string): void {
    this.apiService = this.factory.getApiService(apiName);
  };

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    return this.apiService.getRecipesList(query).pipe(
      // catchError(this.handleError.bind(this))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    return this.apiService.getRecipeDetails(id).pipe(
      // catchError(this.handleError.bind(this))
    );
  };

  // private handleError(error: any): Observable<never> {
  //   const errorMessage = error.error?.message || 'An error occurred in recipe-data.service';
  //   // Sanitize error message
  //   const sanitizedErrorMessage = this.sanitizeErrorMessage(errorMessage);
  //   // this.globalStateService.setError(sanitizedErrorMessage);
  //   return throwError(() => new Error(sanitizedErrorMessage));
  // };

  // private sanitizeErrorMessage(message: string): string {
  //   if (/apiKey=/.test(message)) {
  //     return message.replace(/apiKey=\w+/g, 'apiKey=***');
  //   }
  //   if (/app_key=/.test(message)) {
  //     const errMsg = message.replace(/app_key=\w+/g, 'app_key=***');
  //     return errMsg.replace(/app_id=\w+/g, 'app_id=***');
  //   }
  //   return message;
  // };
};