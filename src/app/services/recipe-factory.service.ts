import { Injectable, inject } from '@angular/core';
import { SpoonacularService } from './spoonacular.service';
import { EdamamService } from './edamam.service';
import { RecipeApiInterface } from './recipe-api.interface';
import { EDAMAM_KEY_NAME, SPOONACULAR_KEY_NAME } from 'app/shared/constants/ui';

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
