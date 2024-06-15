import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeDetail } from '../models/recipe.model';
import { FilterState, RecipeApiInterface, RecipeFactoryService, SPOONACULAR_KEY_NAME } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private factory = inject(RecipeFactoryService);
  private apiService: RecipeApiInterface;

  constructor() {
    // Default to spoonacular api.
    this.apiService = this.factory.getApiService(SPOONACULAR_KEY_NAME);
  }

  switchApi(apiName: string): void {
    this.apiService = this.factory.getApiService(apiName);
  };

  getRecipesList(query: FilterState): Observable<Recipe[]> {
    return this.apiService.getRecipesList(query);
  };

  getRecipeDetails(id: string): Observable<RecipeDetail> {
    return this.apiService.getRecipeDetails(id);
  };
};