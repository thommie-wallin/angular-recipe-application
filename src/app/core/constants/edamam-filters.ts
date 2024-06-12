import { FilterCategory } from '../interfaces/api-filter.interface';

export const EDAMAM_KEY_NAME = 'edamam';
export const EDAMAM_FILTER_CATEGORIES: FilterCategory[] = [
  {
    key: 'dishType', 
    label: 'Dish type',
    options: ['none', 'biscuits and cookies', 'bread', 'cereals', 'condiments and sauces', 'desserts', 'drinks', 'main course', 'pancake', 'preps', 'preserve', 'salad', 'sandwiches', 'side dish', 'soup', 'starter', 'sweets'],
  },
  {
    key: 'health', 
    label: 'Health',
    options: ['none', 'alcohol-cocktail', 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 'DASH', 'egg-free', 'fish-free', 'fodmap-free','gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 'low-sugar', 'lupine-free', 'mediterranean', 'mollusk-free', 'mustard-free', 'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'],
  },
  {
    key: 'diet',
    label: 'Diet',
    options: ['none', 'balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
  },
];