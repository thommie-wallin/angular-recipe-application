import { Injectable, inject } from '@angular/core';
import { SpoonacularService } from './apis/spoonacular.service';
import { EdamamService } from './apis/edamam.service';
import { RecipeApiInterface } from './recipe-api.interface';
import { EDAMAM_KEY_NAME, SPOONACULAR_KEY_NAME } from 'app/core/constants/ui';

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
