
import { EDAMAM_KEY_NAME } from "./edamam-filters";
import { SPOONACULAR_KEY_NAME } from "./spoonacular-filters";

// Recipe API
export const API_FORM_FIELD = {
  name: 'api',
  label: 'Recipe API',
  categories: [SPOONACULAR_KEY_NAME, EDAMAM_KEY_NAME],
};