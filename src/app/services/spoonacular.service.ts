import { Injectable, inject } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeApiInterface } from './recipe-api.interface';
import { FilterState } from 'app/core/services/filter.service';
import { SpoonacularAdapter } from './adapters/spoonacular.adapter';
import { map } from 'rxjs/operators';
import { Recipe, RecipeDetail } from 'app/models/recipe.model';
import * as mockRecipeJSONDetail from '../../assets/mockRecipeDetail.json';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(SpoonacularAdapter);
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

    return this.apiService.get<any[]>(`${this.baseUrl}complexSearch?`, { 
      params: filterParams
      .append('number', 4)
      .append('instructionsRequired', true)
      .append('apiKey',this.apiKey) 
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response))
    );
    
    // Implement the API call
    // return of([]);
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    console.log(id);
    

    return this.apiService.get(
      `${this.baseUrl}${id}/information`, { 
        params: new HttpParams()
        .append('apiKey',this.apiKey) 
      }).pipe(
        map(response => this.adapter.adaptToRecipeDetail(response))
      );

    // Implement the API call
    // const recipeDetail = mockRecipeJSONDetail;
    return of(null);
  };
}
