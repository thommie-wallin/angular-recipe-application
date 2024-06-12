
// Spoonacular Recipe API
// export const SPOONACULAR_KEY_NAME = 'spoonacular';
// export const SPOONACULAR_FILTER_CATEGORIES = [
//   {
//     key: 'type', 
//     label: 'Meal type',
//     options: ['none', 'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'],
//   },
//   {
//     key: 'diet', 
//     label: 'Diet',
//     options: ['none', 'gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal'],
//   },
//   {
//     key: 'intolerances',
//     label: 'Intolerances',
//     options: ['none', 'dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'],
//   },
// ];

import { EDAMAM_KEY_NAME } from "./edamam-filters";
import { SPOONACULAR_KEY_NAME } from "./spoonacular-filters";

// // Edamam Recipe API
// export const EDAMAM_KEY_NAME = 'edamam';
// export const EDAMAM_FILTER_CATEGORIES = [
//   {
//     key: 'dishType', 
//     label: 'Dish type',
//     options: ['none', 'biscuits and cookies', 'bread', 'cereals', 'condiments and sauces', 'desserts', 'drinks', 'main course', 'pancake', 'preps', 'preserve', 'salad', 'sandwiches', 'side dish', 'soup', 'starter', 'sweets'],
//   },
//   {
//     key: 'health', 
//     label: 'Health',
//     options: ['none', 'alcohol-cocktail', 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 'DASH', 'egg-free', 'fish-free', 'fodmap-free','gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 'low-sugar', 'lupine-free', 'mediterranean', 'mollusk-free', 'mustard-free', 'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'],
//   },
//   {
//     key: 'diet',
//     label: 'Diet',
//     options: ['none', 'balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
//   },
// ];

// Recipe API
export const API_FORM_FIELD = {
  name: 'api',
  label: 'Recipe API',
  categories: [SPOONACULAR_KEY_NAME, EDAMAM_KEY_NAME],
};