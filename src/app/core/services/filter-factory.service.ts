import { Injectable } from '@angular/core';
import { SPOONACULAR_FILTER_CATEGORIES, SPOONACULAR_KEY_NAME } from '../constants/spoonacular-filters';
import { EDAMAM_FILTER_CATEGORIES, EDAMAM_KEY_NAME } from '../constants/edamam-filters';
import { FilterCategory } from '../interfaces/api-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterFactoryService {
  getFilterCategories(apiKey: string): FilterCategory[] {
    switch (apiKey) {
      case SPOONACULAR_KEY_NAME:
        return SPOONACULAR_FILTER_CATEGORIES;
      case EDAMAM_KEY_NAME:
        return EDAMAM_FILTER_CATEGORIES;
      default:
        throw new Error('Unsupported API');
    };
  };
};