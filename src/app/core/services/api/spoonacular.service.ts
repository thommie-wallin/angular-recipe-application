import { Injectable, inject } from '@angular/core';
// import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { FilterState } from 'app/core/services/filter.service';
import { map } from 'rxjs/operators';
// import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';
import { RecipeApiInterface } from '../recipe-api.interface';
import { ApiService } from '../api.service';
import { Recipe, RecipeDetail, SpoonacularAdapter } from '../../../features/recipes';
import { environment } from '../../../../environments/environment';
import { FilterState } from '../filter.service';
// import { SpoonacularAdapter } from 'app/features/recipes/services/adapters/spoonacular.adapter';

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