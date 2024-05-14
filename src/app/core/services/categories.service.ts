import { Injectable, inject } from '@angular/core';
import { FormFieldCategory } from 'app/recipes/categories/model/form-field-category.model';
import { Category } from 'app/shared/models/category.model';
import { of } from 'rxjs';
import { FilterService } from './filter.service';
import { CATEGORY_LABELS, EDAMAM_ALLERGENES, EDAMAM_DISH_TYPES, EDAMAM_HEALTH_LABELS, SPOONACULAR_ALLERGENES, SPOONACULAR_DIETS, SPOONACULAR_MEAL_TYPES } from 'app/shared/constants/ui';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private filterService = inject(FilterService);

  // private labels = CATEGORY_LABELS;
  // private 

  constructor() { }

  getCategories() {
    const api = this.filterService.api();
    // console.log(api);
    
    const categories = [

      new Category(
        'mealType', 
        CATEGORY_LABELS.mealType,
        api === 'spoonacular' ? SPOONACULAR_MEAL_TYPES : EDAMAM_DISH_TYPES
      ),
      new Category(
        'diet', 
        CATEGORY_LABELS.diet,
        api === 'spoonacular' ? SPOONACULAR_DIETS : EDAMAM_HEALTH_LABELS
      ),
      new Category(
        'allergene', 
        CATEGORY_LABELS.allergene,
        api === 'spoonacular' ? SPOONACULAR_ALLERGENES : EDAMAM_ALLERGENES
      ),

      // new FormFieldCategory({
      //   key: 'api',
      //   label: 'Recipe API',
      //   options: [
      //     {key: 'spoonacular',  value: 'Spoonacular'},
      //     {key: 'edamam',  value: 'Edamam'},
      //   ],
      // }),

    ];
    return categories;
  };
}
