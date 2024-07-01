import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { EdamamAdapter, Recipe, RecipeDetail } from '../../../features/browse';
import { environment } from '../../../../environments/environment';
import { RecipeApiInterface } from '../../interfaces/recipe-api.interface';
import { FilterState } from '../../interfaces/api-filter.interface';
import { GlobalStateService } from '../../../state';

@Injectable({
  providedIn: 'root'
})
export class EdamamService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(EdamamAdapter);
  private globalStateService = inject(GlobalStateService);
  private baseUrl: string = `${environment.edamamBaseUrl}`;
  private apiKey: string = `${environment.edamamApiKey}`;
  private apiId: string = `${environment.edamamApiId}`;

  private constructUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}?type=public&app_key=${this.apiKey}&app_id=${this.apiId}`;
  };

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    let filterParams = new HttpParams();

    // Set request parameters to an instance of 'HttpParams', unless property value is 'none'.
    for (const property in query) {
      if (query[property] !== 'none') {
        filterParams = filterParams.set(property, query[property]);
      };
    };

    return this.apiService.get<Recipe[]>(this.constructUrl('api/recipes/v2/test'), { 
      params: filterParams
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response)),
      catchError(error => this.handleError(error))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    const endpoint = `api/recipes/v2/${id}`;

    return this.apiService.get<RecipeDetail>(this.constructUrl(endpoint), { 
      params: new HttpParams()
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response)),
      catchError(error => this.handleError(error))
    );
  };

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'An error occurred';
    const sanitizedErrorMessage = this.sanitizeErrorMessage(errorMessage);
    this.globalStateService.setError(sanitizedErrorMessage);
    return throwError(() => new Error(sanitizedErrorMessage));
  };

  private sanitizeErrorMessage(message: string): string {
    if (/apiKey=/.test(message)) {
      return 'An error occurred. Please try again later.';
    }
    return message;
  };
};