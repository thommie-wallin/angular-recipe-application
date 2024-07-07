import { Injectable, inject } from '@angular/core';
import { RecipeApiInterface, RecipeFactoryService, SPOONACULAR_KEY_NAME } from '../../../core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientDataService {
  private factory = inject(RecipeFactoryService);
  private apiService: RecipeApiInterface;

  constructor() {
    // Default to spoonacular api.
    this.apiService = this.factory.getApiService(SPOONACULAR_KEY_NAME);
  };

  switchApi(apiName: string): void {
    this.apiService = this.factory.getApiService(apiName);
  };

  getIngredientAutocompleteOptions(queary: string): Observable<string[]> {
    return this.apiService.getIngredientAutocompleteOptions(queary);
    // console.log(queary);
    
    // return of(['testar']);
  };
};
