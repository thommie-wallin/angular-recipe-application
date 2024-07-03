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
      catchError(error => this.handleServiceSpecificError(error))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    return this.apiService.getRecipeDetails(id).pipe(
      catchError(error => this.handleServiceSpecificError(error))
    );
  };

  private handleServiceSpecificError(error: any): Observable<never> {
    // Handle errors specific to this service, if necessary
    // For example, transform error messages or handle specific error codes
    const transformedError = this.transformError(error);
    return throwError(() => transformedError);
  };

  private transformError(error: any): any {
    // Implement service-specific error transformation logic here
    return {
      ...error,
      message: `Recipe Data Service Error: ${error.message}`
    };
  };
};