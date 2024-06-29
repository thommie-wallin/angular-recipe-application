export const environment = {
  production: true,
  spoonacularRecipeUrl: import.meta.env["NG_APP_SPOONACULAR_RECIPE_URL"],
  spoonacularIngredientAutocompleteUrl: import.meta.env["NG_APP_SPOONACULAR_INGREDIENT_AUTOCOMPLETE_URL"],
  spoonacularApiKey: import.meta.env["NG_APP_SPOONACULAR_API_KEY"],
  edamamRecipeUrl: import.meta.env["NG_APP_EDAMAM_RECIPE_URL"],
  edamamIngredientAutocompleteUrl: import.meta.env["NG_APP_EDAMAM_INGREDIENT_AUTOCOMPLETE_URL"],
  edamamApiKey: import.meta.env["NG_APP_EDAMAM_API_KEY"],
  edamamApiId: import.meta.env["NG_APP_EDAMAM_API_ID"],
};
