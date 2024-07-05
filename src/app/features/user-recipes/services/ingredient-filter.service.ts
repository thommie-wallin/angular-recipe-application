import { Injectable, inject, signal } from '@angular/core';
import { FilterState, SPOONACULAR_KEY_NAME } from '../../../core';
import { toObservable } from '@angular/core/rxjs-interop';
import { IngredientDataService } from './ingredient-data.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientFilterService {
  private ingredientDataService = inject(IngredientDataService);
  // private state = signal<FilterState>({});
  private selectedApi = signal<string>(SPOONACULAR_KEY_NAME);

  // Observables
  // state$ = toObservable(this.state);
  selectedApi$ = toObservable(this.selectedApi);

  constructor() {
    this.updateFilter(SPOONACULAR_KEY_NAME );
  };

  updateFilter(selected: string) {
    // const api = selected['api'];
    this.selectedApi.set(selected);

    // Change selected API in data service.
    this.ingredientDataService.switchApi(selected);

    
    // if ('api' in selected) {
      
    // } else {
    //   // this.state.update((state) => ({
    //   //   ...state,
    //   //   ...selected,
    //   // }));
    // }
  };
};
