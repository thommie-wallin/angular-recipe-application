import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { RecipeDataService } from '../../features/recipes';
import { EDAMAM_FILTER_CATEGORIES, EDAMAM_KEY_NAME, SPOONACULAR_FILTER_CATEGORIES, SPOONACULAR_KEY_NAME } from '../constants/api';

export interface FilterState {
  [index: string]: string; 
};

export interface FilterCategory {
  key: string,
  label: string,
  options: string[],
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private recipeDataService = inject(RecipeDataService);
  private state = signal<FilterState>({});
  private selectedApi = signal<string>(SPOONACULAR_KEY_NAME);

  // Observables
  state$ = toObservable(this.state).pipe(
    // Only emit item if any filterState source property is not 'none'.
    filter(state => Object.values(state).find((el) => el !== 'none') !== undefined)
  );

  selectedApi$ = toObservable(this.selectedApi);

  // selectors (readonly)
  api = computed(() => this.selectedApi());

  constructor() {
    this.setFilter(SPOONACULAR_FILTER_CATEGORIES)
  };

  // Get corresponding categories when switching API.
  getFilterCategories = computed<FilterCategory[]>(() => {
    switch (this.api()) {
      case SPOONACULAR_KEY_NAME:
        return SPOONACULAR_FILTER_CATEGORIES;
      case EDAMAM_KEY_NAME:
        return EDAMAM_FILTER_CATEGORIES;
      default:
        throw new Error('Unsupported API');
    };
  });

  // Update filter state or reset selected categories when switching API:s.
  updateFilter(selected: { [key: string]: string }) {
    if ('api' in selected) {
      const api = selected['api'];

      // Change selected API.
      this.selectedApi.set(api);

      // Change selected API in data service.
      this.recipeDataService.switchApi(api);

      // Change filter categories depending on selected API.
      switch (api) {
        case SPOONACULAR_KEY_NAME:
          this.setFilter(SPOONACULAR_FILTER_CATEGORIES)
          break;
        case EDAMAM_KEY_NAME:
          this.setFilter(EDAMAM_FILTER_CATEGORIES)
          break;
        default:
          throw new Error('Unsupported API');
      };

    } else {
      this.state.update((state) => ({
        ...state,
        ...selected,
      }));
    };
  };

  setFilter(categories: FilterCategory[]) {
    const newState: FilterState = {};

    for (const category of categories) {
      newState[category.key] = 'none';
    };

    this.state.set(newState);
  };
};
