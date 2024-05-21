import { Recipe } from "app/shared/interfaces/recipe.interface";
import { Observable } from "rxjs";

export interface RecipeApiInterface {
  getRecipesList(query: string): Observable<Recipe[]>;
  getRecipeDetails(id: string): Observable<Recipe>;
};