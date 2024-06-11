import { Observable } from "rxjs";
import { FilterState } from "./filter.service";
import { Recipe, RecipeDetail } from "../../features/recipes";

export interface RecipeApiInterface {
  getRecipesList(query: FilterState): Observable<Recipe[]>;
  getRecipeDetails(id: string): Observable<RecipeDetail>;
};