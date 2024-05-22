import { Injectable, inject } from '@angular/core';
import { RecipeApiInterface } from './recipe-api.interface';
import { RecipeFactoryService } from './recipe-factory.service';
import { SPOONACULAR_KEY_NAME } from 'app/shared/constants/ui';
import { Observable } from 'rxjs';
import { Recipe } from 'app/shared/interfaces/recipe.interface';
import { FilterState } from 'app/core/services/filter.service';

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

  getRecipeDetails(id: string): Observable<Recipe> {
    return this.apiService.getRecipeDetails(id);
  };
};