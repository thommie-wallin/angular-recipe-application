import { Injectable, computed, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { CATEGORY_FORM_FIELDS, CATEGORY_LABELS, EDAMAM_ALLERGENES, EDAMAM_DISH_TYPES, EDAMAM_HEALTH_LABELS, SPOONACULAR_ALLERGENES, SPOONACULAR_DIETS, SPOONACULAR_MEAL_TYPES } from 'app/shared/constants/ui';
import { Category } from 'app/shared/models/category.model';

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

  getFilterCategories = computed(() => {
    const categories = [
      new Category(
        'mealType', 
        CATEGORY_LABELS.mealType,
        this.api() === 'spoonacular' ? SPOONACULAR_MEAL_TYPES : EDAMAM_DISH_TYPES
      ),
      new Category(
        'diet', 
        CATEGORY_LABELS.diet,
        this.api() === 'spoonacular' ? SPOONACULAR_DIETS : EDAMAM_HEALTH_LABELS
      ),
      new Category(
        'allergene', 
        CATEGORY_LABELS.allergene,
        this.api() === 'spoonacular' ? SPOONACULAR_ALLERGENES : EDAMAM_ALLERGENES
      ),
    ];
    return categories;
  });

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
    console.log(this.state());
  };
}
