import { Injectable, computed, inject, signal } from '@angular/core';
import { SPOONACULAR_KEY_NAME } from '../../../core';
import { IngredientDataService } from './ingredient-data.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientFilterService {
  private ingredientDataService = inject(IngredientDataService);
  private selectedApi = signal<string>(SPOONACULAR_KEY_NAME);

  // Selector
  api = computed(() => this.selectedApi());

  constructor() {
    this.changeSelectedApi(SPOONACULAR_KEY_NAME );
  };

  changeSelectedApi(selected: string) {
    // Change selected API in data service.
    this.ingredientDataService.switchApi(selected);
    this.selectedApi.set(selected);
  };
};
