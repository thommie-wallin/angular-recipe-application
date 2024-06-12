import { Injectable, inject } from '@angular/core';
import { SpoonacularService } from './api/spoonacular.service';
import { EdamamService } from './api/edamam.service';
// import { EDAMAM_KEY_NAME, SPOONACULAR_KEY_NAME } from '../constants/api';
import { RecipeApiInterface } from '../interfaces/recipe-api.interface';
import { SPOONACULAR_KEY_NAME } from '../constants/spoonacular-filters';
import { EDAMAM_KEY_NAME } from '../constants/edamam-filters';

@Injectable({
  providedIn: 'root'
})
export class RecipeFactoryService {
  private spoonacularService = inject(SpoonacularService);
  private edamamService = inject(EdamamService);

  getApiService(apiName: string): RecipeApiInterface {
    switch (apiName) {
      case SPOONACULAR_KEY_NAME:
        return this.spoonacularService;
      case EDAMAM_KEY_NAME:
        return this.edamamService;
      default:
        throw new Error('Unsupported API');
    };
  };
};
