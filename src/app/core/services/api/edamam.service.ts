import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { EdamamAdapter, Recipe, RecipeDetail } from '../../../features/browse';
import { environment } from '../../../../environments/environment';
import { RecipeApiInterface } from '../../interfaces/recipe-api.interface';
import { FilterState } from '../../interfaces/api-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class EdamamService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(EdamamAdapter);

  private baseUrl: string = `${environment.edamamBaseUrl}`;
  private recipeApiKey: string = `${environment.edamamRecipeApiKey}`;
  private recipeApiId: string = `${environment.edamamRecipeApiId}`;
  private foodApiKey: string = `${environment.edamamFoodApiKey}`;
  private foodApiId: string = `${environment.edamamFoodApiId}`;

  private constructUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}?type=public&app_key=${this.recipeApiKey}&app_id=${this.recipeApiId}`;
  };

  private constructFoodApiUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}?app_key=${this.foodApiKey}&app_id=${this.foodApiId}`;
  };

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    let filterParams = new HttpParams();

    // Set request parameters to an instance of 'HttpParams', unless property value is 'none'.
    for (const property in query) {
      if (query[property] !== 'none') {
        filterParams = filterParams.set(property, query[property]);
      };
    };

    return this.apiService.get<Recipe[]>(this.constructUrl('api/recipes/v2'), { 
      params: filterParams
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    const endpoint = `api/recipes/v2/${id}`;

    return this.apiService.get<RecipeDetail>(this.constructUrl(endpoint), { 
      params: new HttpParams()
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response))
    );
  };

  getIngredientAutocompleteOptions(searchTerm: string): Observable<string[]> {
    const searchParam = new HttpParams().set('q', searchTerm).set('limit', 5);
    
    return this.apiService.get<string[]>(this.constructFoodApiUrl('auto-complete'), { params: searchParam });
  };
};