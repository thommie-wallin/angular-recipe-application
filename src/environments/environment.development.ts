export const environment = {
  production: false,
  spoonacularBaseUrl: import.meta.env["NG_APP_SPOONACULAR_BASE_URL"],
  spoonacularApiKey: import.meta.env["NG_APP_SPOONACULAR_API_KEY"],

  edamamBaseUrl: import.meta.env["NG_APP_EDAMAM_BASE_URL"],
  edamamRecipeApiKey: import.meta.env["NG_APP_EDAMAM_RECIPE_API_KEY"],
  edamamRecipeApiId: import.meta.env["NG_APP_EDAMAM_RECIPE_API_ID"],
  edamamFoodApiKey: import.meta.env["NG_APP_EDAMAM_FOOD_API_KEY"],
  edamamFoodApiId: import.meta.env["NG_APP_EDAMAM_FOOD_API_ID"],
};