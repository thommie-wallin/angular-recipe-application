import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ApiService } from 'app/core/services/api.service';
import { FilterState } from 'app/core/services/filter.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';
import { EdamamAdapter } from 'app/features/recipes/services/adapters/edamam.adapter';
import { RecipeApiInterface } from '../recipe-api.interface';

@Injectable({
  providedIn: 'root'
})
export class EdamamService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private adapter = inject(EdamamAdapter);
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

    return this.apiService.get<Recipe[]>(`${this.baseUrl}?`, { 
      params: filterParams
      .append('type', 'public')
      .append('app_key',this.apiKey)
      .append('app_id', this.apiId)
    }).pipe(map(response => this.adapter.adaptToRecipeList(response)));
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    return this.apiService.get<RecipeDetail>(`${this.baseUrl}/${id}`, { 
      params: new HttpParams()
      .append('type', 'public')
      .append('app_key',this.apiKey)
      .append('app_id', this.apiId)
    }).pipe(
      map(response => this.adapter.adaptToRecipeDetail(response))
    );
  };
};