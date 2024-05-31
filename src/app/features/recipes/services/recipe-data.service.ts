import { Injectable, inject } from '@angular/core';
import { RecipeApiInterface } from '../../../core/services/recipe-api.interface';
import { SPOONACULAR_KEY_NAME } from 'app/core/constants/api';
import { Observable } from 'rxjs';
import { FilterState } from 'app/core/services/filter.service';
import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';
import { RecipeFactoryService } from 'app/core/services/recipe-factory.service';

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