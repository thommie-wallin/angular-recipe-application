import { Injectable, computed, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { EDAMAM_FILTER_CATEGORIES, EDAMAM_KEY_NAME, SPOONACULAR_FILTER_CATEGORIES, SPOONACULAR_KEY_NAME } from 'app/shared/constants/ui';
import { toObservable } from '@angular/core/rxjs-interop';

export interface FilterState {
  api: string,
  mealType: string,
  diet: string,
  intolerances: string,
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
  private state = signal<FilterState>({
    api: 'spoonacular',
    mealType: 'none', 
    diet: 'none',
    intolerances: 'none',
  });

  state$ = toObservable(this.state);

  // selectors (readonly)
  api = computed(() => this.state().api);
  mealType = computed(() => this.state().mealType);
  diet = computed(() => this.state().diet);
  allergene = computed(() => this.state().intolerances);

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
      this.state.update(() => ({
        ...selected,
        mealType: 'none', 
        diet: 'none',
        intolerances: 'none',
      }));
    } else {
      this.state.update((state) => ({
        ...state,
        ...selected,
      }));
    };
    // console.log(this.state());
  };
}
