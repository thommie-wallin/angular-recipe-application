import { Injectable, computed, inject, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { EDAMAM_FILTER_CATEGORIES, EDAMAM_KEY_NAME, SPOONACULAR_FILTER_CATEGORIES, SPOONACULAR_KEY_NAME } from 'app/core/constants/ui';
import { toObservable } from '@angular/core/rxjs-interop';
import { RecipeDataService } from 'app/features/recipes/services/recipe-data.service';
import { filter } from 'rxjs/operators';

export interface FilterState {
  [index: string]: string; 
};

export interface FilterCategory {
  key: string,
  label: string,
  options: string[],
};

@Injectable({
  providedIn: CoreModule
})
export class FilterService {
  private recipeDataService = inject(RecipeDataService);
  private state = signal<FilterState>(null);
  private selectedApi = signal(SPOONACULAR_KEY_NAME);

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
  getFilterCategories = computed(() => {
    let categories: FilterCategory[];

    switch (this.api()) {
      case SPOONACULAR_KEY_NAME:
        categories = SPOONACULAR_FILTER_CATEGORIES;
        break;
      case EDAMAM_KEY_NAME:
        categories = EDAMAM_FILTER_CATEGORIES;
        break;
      default:
        categories = null;
        break;
    };

    return categories;
  });

  // Update filter state or reset selected categories when switching API:s.
  updateFilter(selected) {
    if (Object.hasOwn(selected, 'api')) {
      // Change selected API.
      this.selectedApi.set(selected.api);

      // Change selected API in data service.
      this.recipeDataService.switchApi(selected.api);

      // Change filter categories depending on selected API.
      switch (selected.api) {
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
    // console.log(this.state());
  };

  setFilter(categories) {
    // Reset state
    this.state.set(null);

    for (const category of categories) {
      this.state.update((state) => ({
        ...state,
        [category.key]: 'none',
      }))
    };
  };
}
