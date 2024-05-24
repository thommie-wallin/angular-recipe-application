import { FilterState } from "app/core/services/filter.service";
import { Recipe, RecipeDetail } from "app/models/recipe.model";
import { Observable } from "rxjs";

export interface RecipeApiInterface {
  getRecipesList(query: FilterState): Observable<Recipe[]>;
  getRecipeDetails(id: string): Observable<RecipeDetail>;
};