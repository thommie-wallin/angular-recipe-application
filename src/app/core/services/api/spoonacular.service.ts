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
  private baseUrl: string = `${environment.spoonacularRecipeUrl}`;
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