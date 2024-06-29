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
  private baseUrl: string = `${environment.edamamRecipeUrl}`;
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