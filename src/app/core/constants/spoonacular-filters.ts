import { FilterCategory } from '../interfaces/api-filter.interface';

export const SPOONACULAR_KEY_NAME = 'spoonacular';
export const SPOONACULAR_FILTER_CATEGORIES: FilterCategory[] = [
  {
    key: 'type', 
    label: 'Meal type',
    options: ['none', 'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'],
  },
  {
    key: 'diet', 
    label: 'Diet',
    options: ['none', 'gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal'],
  },
  {
    key: 'intolerances',
    label: 'Intolerances',
    options: ['none', 'dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'],
  },
];