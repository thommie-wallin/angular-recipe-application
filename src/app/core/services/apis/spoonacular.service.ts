import { Injectable, inject } from '@angular/core';
// import { ApiService } from '../core/services/api.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { RecipeApiInterface } from '../features/recipes/services/recipe-api.interface';
import { FilterState } from 'app/core/services/filter.service';
// import { SpoonacularAdapter } from '../features/recipes/services/adapters/spoonacular.adapter';
import { map } from 'rxjs/operators';
import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';
import { RecipeApiInterface } from '../recipe-api.interface';
import { ApiService } from '../api.service';
import { SpoonacularAdapter } from 'app/features/recipes/services/adapters/spoonacular.adapter';

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

    return this.apiService.get<Recipe[]>(`${this.baseUrl}complexSearch?`, { 
      params: filterParams
      .append('number', 4)
      .append('instructionsRequired', true)
      .append('apiKey',this.apiKey) 
    }).pipe(
      map(response => this.adapter.adaptToRecipeList(response))
    );
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {

    return this.apiService.get<RecipeDetail>(`${this.baseUrl}${id}/information`, { 
      params: new HttpParams()
      .append('apiKey',this.apiKey) 
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response))
    );
  };
};