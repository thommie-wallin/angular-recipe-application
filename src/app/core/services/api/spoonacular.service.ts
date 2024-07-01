import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Recipe, RecipeDetail, SpoonacularAdapter } from '../../../features/browse';
import { environment } from '../../../../environments/environment';
import { RecipeApiInterface } from '../../interfaces/recipe-api.interface';
import { FilterState } from '../../interfaces/api-filter.interface';
import { GlobalStateService } from '../../../state';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(SpoonacularAdapter);
  private globalStateService = inject(GlobalStateService);
  private baseUrl: string = `${environment.spoonacularBaseUrl}`;
  private apiKey: string = `${environment.spoonacularApiKey}`;

  private constructUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}?apiKey=${this.apiKey}`;
  };

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    let filterParams = new HttpParams();

    // Set request parameters to an instance of 'HttpParams', unless property value is 'none'.
    for (const property in query) {
      if (query[property] !== 'none') {
        filterParams = filterParams.set(property, query[property]);
      };
    };

    return this.apiService.get<Recipe[]>(this.constructUrl('recipes/complexSearch/test'), { 
      params: filterParams
      .append('number', 4)
      .append('instructionsRequired', true)
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response)),
      catchError(error => this.handleError(error))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    const endpoint = `recipes/${id}/information`;

    return this.apiService.get<RecipeDetail>(this.constructUrl(endpoint), { 
      params: new HttpParams()
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response)),
      catchError(error => this.handleError(error))
    );
  };

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'An error occurred';
    this.globalStateService.setError(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
};