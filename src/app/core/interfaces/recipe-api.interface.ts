import { Observable } from "rxjs";
import { Recipe, RecipeDetail } from "../../features/browse";
import { FilterState } from "./api-filter.interface";
// import { FilterState } from "../services/filter.service";

export interface RecipeApiInterface {
  getRecipesList(query: FilterState): Observable<Recipe[]>;
  getRecipeDetails(id: string): Observable<RecipeDetail>;
  // getIngredientAutocompleteOptions(queary: string): Observable<string[]>;
};