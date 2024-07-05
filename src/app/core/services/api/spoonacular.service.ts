import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Recipe, RecipeDetail, SpoonacularAdapter } from '../../../features/browse';
import { environment } from '../../../../environments/environment';
import { RecipeApiInterface } from '../../interfaces/recipe-api.interface';
import { FilterState } from '../../interfaces/api-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(SpoonacularAdapter);
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

    return this.apiService.get<Recipe[]>(this.constructUrl('recipes/complexSearch'), { 
      params: filterParams
      .append('number', 4)
      .append('instructionsRequired', true)
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    const endpoint = `recipes/${id}/information`;

    return this.apiService.get<RecipeDetail>(this.constructUrl(endpoint), { 
      params: new HttpParams()
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response))
    );
  };

  getIngredientAutocompleteOptions(searchTerm: string): Observable<string[]> {
    const searchParam = new HttpParams().set('query', searchTerm).set('number', 5).set('metaInformation', false);
    
    return this.apiService.get<string[]>(this.constructUrl('food/ingredients/autocomplete'), { 
      params: searchParam
      // .append('number', 5)
      // .append('metaInformation', false)
    }).pipe(
      // map(response => this.adapter.adaptToRecipeList(response))
    );
  }
};