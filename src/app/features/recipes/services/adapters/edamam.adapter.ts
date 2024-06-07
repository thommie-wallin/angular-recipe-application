import { Injectable } from '@angular/core';
import { EDAMAM_KEY_NAME } from 'app/core';
import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';

interface Ingredient {
  food: string; 
  quantity: number; 
  measure: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class EdamamAdapter {

  adaptToRecipe(apiResponse: any): Recipe {
    return { 
      id: apiResponse.recipe.uri.split('#recipe_').pop(),
      title: apiResponse.recipe.label, 
      imageUrl: apiResponse.recipe.image, 
      api: EDAMAM_KEY_NAME,
    };
  };

  adaptToRecipeList(apiResponse: any): Recipe[] {
    return apiResponse.hits.map(this.adaptToRecipe);
  };

  adaptToRecipeDetail(apiResponse: any): RecipeDetail {
    return {
      id: apiResponse.recipe.uri.split('#recipe_').pop(),
      title: apiResponse.recipe.label, 
      ingredients: apiResponse.recipe.ingredients.map((ing: Ingredient) => ({ 
        name: ing.food, 
        quantity: ing.quantity, 
        unit: ing.measure.includes('<') ? null : ing.measure,
      })),
      instructions: apiResponse.recipe.url,
      totalTime: (apiResponse.recipe.totalTime),
      servings: apiResponse.recipe.yield,
      imageUrl: apiResponse.recipe.image, 
      api: EDAMAM_KEY_NAME,
    };
  };
};