// Recipe select constants
// export const SELECT_CATEGORIES = ['api', 'mealType', 'diet', 'allergene'];
// export const CATEGORIES = { api: 'api', mealType: 'mealType', diet: 'diet', allergene: 'allergene' };

export const CATEGORY_LABELS = { api: 'Recipe API', mealType: 'Meal type', diet: 'Diet', allergene: 'Allergene'};

export const RECIPE_API = ['spoonacular', 'edamam'];

export const SPOONACULAR_MEAL_TYPES = ['none', 'appetizer', 'main course', 'dessert'];
export const SPOONACULAR_DIETS = ['none', 'gluten free', 'vegetarian', 'vegan'];
export const SPOONACULAR_ALLERGENES = ['none', 'egg', 'peanut', 'dairy'];

export const EDAMAM_DISH_TYPES = ['none', 'starter', 'main course', 'desserts'];
export const EDAMAM_HEALTH_LABELS = ['none', 'gluten-free', 'vegetarian', 'vegan'];
export const EDAMAM_ALLERGENES = ['none','egg-free', 'peanut-free', 'dairy-free'];

// export const CATEGORIES = ['api', 'Recipe API', ['mealType', 'Meal type'], ['diet', 'Diet'], ['allergene', 'Allergene']];

export const API_FORM_FIELD = {
  name: 'api',
  label: CATEGORY_LABELS.api,
  categories: RECIPE_API,
}

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