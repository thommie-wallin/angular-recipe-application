// Recipe form field labels
export const CATEGORY_LABELS = { api: 'Recipe API', mealType: 'Meal type', diet: 'Diet', allergene: 'Allergene'};

// Recipe form field option lists
export const RECIPE_API_TYPES = ['spoonacular', 'edamam'];

export const SPOONACULAR_MEAL_TYPES = ['none', 'appetizer', 'main course', 'dessert'];
export const SPOONACULAR_DIETS = ['none', 'gluten free', 'vegetarian', 'vegan'];
export const SPOONACULAR_ALLERGENES = ['none', 'egg', 'peanut', 'dairy'];

export const EDAMAM_DISH_TYPES = ['none', 'starter', 'main course', 'desserts'];
export const EDAMAM_HEALTH_LABELS = ['none', 'gluten-free', 'vegetarian', 'vegan'];
export const EDAMAM_ALLERGENES = ['none','egg-free', 'peanut-free', 'dairy-free'];

// Recipe form field category objects
export const API_FORM_FIELD = {
  name: 'api',
  label: CATEGORY_LABELS.api,
  categories: RECIPE_API_TYPES,
};

export const CATEGORY_FORM_FIELDS = [ 
  {
    name: 'mealType', 
    label: CATEGORY_LABELS.mealType,
    spoonacular: SPOONACULAR_MEAL_TYPES,
    edamam: EDAMAM_DISH_TYPES,
  },
  {
    name: 'diet', 
    label: CATEGORY_LABELS.diet,
    spoonacular: SPOONACULAR_DIETS,
    edamam: EDAMAM_HEALTH_LABELS,
  },
  {
    name: 'allergene',
    label: CATEGORY_LABELS.allergene,
    spoonacular: SPOONACULAR_ALLERGENES,
    edamam: EDAMAM_ALLERGENES,
  },
];

// export const SPOONACULAR_FILTER_CATEGORIES = [
//   mealType: {
//     name: 'mealType', 
//     label: CATEGORY_LABELS.mealType,
//     spoonacular: SPOONACULAR_MEAL_TYPES,
//   },
// ];
// export const EDAMAM_FILTER_CATEGORIES = [];