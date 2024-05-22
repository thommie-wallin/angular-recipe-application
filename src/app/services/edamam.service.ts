import { Injectable, inject } from '@angular/core';
import { RecipeApiInterface } from './recipe-api.interface';
import { Observable, of } from 'rxjs';
import { Recipe } from 'app/shared/interfaces/recipe.interface';
import { environment } from 'environments/environment';
import { ApiService } from 'app/core/services/api.service';
import { FilterState } from 'app/core/services/filter.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EdamamService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private baseUrl: string = `${environment.edamamBaseUrl}`;
  private apiKey: string = `${environment.edamamApiKey}`;
  private apiId: string = `${environment.edamamApiId}`;

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    let filterParams = new HttpParams();

    // Set request parameters to an instance of 'HttpParams', unless property value is 'none'.
    for (const property in query) {
      if (query[property] !== 'none') {
        filterParams = filterParams.set(property, query[property]);
      };
    };

    console.log('edamam', query);

    return this.apiService.get(`${this.baseUrl}?`, { 
      params: filterParams
      .append('app_key',this.apiKey)
      .append('app_id', this.apiId)
      .append('type', 'public')
    });

    // Implement the API call
    return of([]);
  }

  getRecipeDetails(id: string): Observable<Recipe> {
    // Implement the API call
    return of(null);
  }
}
