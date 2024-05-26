import { Injectable, computed, signal } from '@angular/core';
import { RecipeDetail } from 'app/models/recipe.model';

export interface RecipeDisplayState {
  recipeDisplayItem: RecipeDetail;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeDisplayService {

  // state
  private state = signal<RecipeDisplayState>({
    recipeDisplayItem: null,
    loaded: false,
  });

  // selectors
  recipeDisplayItem = computed(() => this.state().recipeDisplayItem);
  loaded = computed(() => this.state().loaded);

  // sources
  // private checklistItemsLoaded$ = this.storageService.loadChecklistItems();

  constructor() { }
}
