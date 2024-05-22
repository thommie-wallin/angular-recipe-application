import { FilterState } from "app/core/services/filter.service";
import { Recipe } from "app/shared/interfaces/recipe.interface";
import { Observable } from "rxjs";

export interface RecipeApiInterface {
  getRecipesList(query: FilterState): Observable<Recipe[]>;
  getRecipeDetails(id: string): Observable<Recipe>;
};