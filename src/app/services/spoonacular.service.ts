import { Injectable, inject } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeApiInterface } from './recipe-api.interface';
import { Recipe } from 'app/shared/interfaces/recipe.interface';
import { FilterState } from 'app/core/services/filter.service';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private baseUrl: string = `${environment.spoonacularBaseUrl}`;
  private apiKey: string = `${environment.spoonacularApiKey}`;

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    let filterParams = new HttpParams();

    // Set request parameters to an instance of 'HttpParams', unless property value is 'none'.
    for (const property in query) {
      if (query[property] !== 'none') {
        filterParams = filterParams.set(property, query[property]);
      };
    };

    return this.apiService.get(`${this.baseUrl}complexSearch?`, { 
      params: filterParams
      .append('number', 4)
      .append('instructionsRequired', true)
      .append('apiKey',this.apiKey) 
    });
    
    // Implement the API call
    // return of([]);
  };

  getRecipeDetails(id: string): Observable<Recipe> {
    // Implement the API call
    return of(null);
  };
}
