import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { RecipeDataService } from '../../features/recipes';
import { FilterCategory, FilterState } from '../interfaces/api-filter.interface';
import { SPOONACULAR_KEY_NAME } from '../constants/spoonacular-filters';
import { FilterFactoryService } from './filter-factory.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private recipeDataService = inject(RecipeDataService);
  private filterFactoryService = inject(FilterFactoryService);

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
    this.updateFilter({ api: SPOONACULAR_KEY_NAME });
  };

  // Get corresponding categories when switching API.
  getFilterCategories = computed<FilterCategory[]>(() => {
    return this.filterFactoryService.getFilterCategories(this.api());
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
      const categories = this.filterFactoryService.getFilterCategories(api);
      this.setFilter(categories);

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
