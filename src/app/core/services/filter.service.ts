import { Injectable, computed, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { EDAMAM_FILTER_CATEGORIES, EDAMAM_KEY_NAME, SPOONACULAR_FILTER_CATEGORIES, SPOONACULAR_KEY_NAME } from 'app/shared/constants/ui';
import { toObservable } from '@angular/core/rxjs-interop';

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
  private state = signal<FilterState>(null);
  state$ = toObservable(this.state);

  // selectors (readonly)
  api = computed(() => this.state().api);

  constructor() {
    this.setFilter({api: SPOONACULAR_KEY_NAME}, SPOONACULAR_FILTER_CATEGORIES)
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

      switch (selected.api) {
        case SPOONACULAR_KEY_NAME:
          this.setFilter(selected, SPOONACULAR_FILTER_CATEGORIES)
          break;
        case EDAMAM_KEY_NAME:
          this.setFilter(selected, EDAMAM_FILTER_CATEGORIES)
          break;
        default:
          this.state.update((state) => ({
            ...state,
            ...selected,
          }));
          break;
      };

    } else {
      this.state.update((state) => ({
        ...state,
        ...selected,
      }));
    };
    // console.log(this.state());
  };

  setFilter(keyName, categories) {
    this.state.set(keyName)

    for (const category of categories) {
      this.state.update((state) => ({
        ...state,
        [category.key]: 'none',
      }))
    };
  };
}
