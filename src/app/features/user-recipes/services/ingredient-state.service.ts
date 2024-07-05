import { Injectable, computed, inject, signal } from '@angular/core';
import { IngredientFilterService } from './ingredient-filter.service';
import { switchMap } from 'rxjs';
import { IngredientDataService } from './ingredient-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class IngredientStateService {
  private ingredientFilterService = inject(IngredientFilterService);
  private ingredientDataService = inject(IngredientDataService);

  private state = signal<string[]>([]);

  // Selectors
  autocompleteOptions = computed(() => this.state());

  // Source
  // private ingredientAutocompleteOptions$ = this.ingredientFilterService.selectedApi$.pipe(
  //   switchMap(selectedApi => this.ingredientDataService.getIngredientAutocompleteOptions(selectedApi))
  // );

  constructor() {
    // Reducer
    // this.ingredientAutocompleteOptions$.pipe(takeUntilDestroyed()).subscribe((data) => 
    //   this.state.set(data)
    // );
  };
};
