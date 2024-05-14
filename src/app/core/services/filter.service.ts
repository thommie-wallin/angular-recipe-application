import { Injectable, computed, signal } from '@angular/core';
import { CoreModule } from '../core.module';

export interface FilterState {
  api: string,
  mealType: string,
  diet: string,
  allergene: string,
};

@Injectable({
  providedIn: CoreModule
})
export class FilterService {
  private state = signal<FilterState>({
    api: 'spoonacular',
    mealType: 'none', 
    diet: 'none',
    allergene: 'none',
  });

  // selectors (readonly)
  api = computed(() => this.state().api);
  mealType = computed(() => this.state().mealType);
  diet = computed(() => this.state().diet);
  allergene = computed(() => this.state().allergene);

  // Update filter state or reset selected categories when switching API:s.
  updateFilter(selected) {
    if (Object.hasOwn(selected, 'api')) {
      this.state.update(() => ({
        ...selected,
        mealType: 'none', 
        diet: 'none',
        allergene: 'none',
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
