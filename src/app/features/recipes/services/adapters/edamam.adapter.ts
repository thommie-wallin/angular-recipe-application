import { Injectable } from '@angular/core';
import { Recipe, RecipeDetail } from '../../models/recipe.model';
import { EDAMAM_KEY_NAME } from '../../../../core';

interface Ingredient {
  food: string; 
  quantity: number; 
  measure: string;
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
        quantity: ing.quantity.toString().length > 4 ? ing.quantity.toFixed(2) : ing.quantity, 
        unit: ing.measure !== null ? (ing.measure.includes('<') ? null : ing.measure) : null,
      })),
      instructions: apiResponse.recipe.url,
      totalTime: (apiResponse.recipe.totalTime),
      servings: apiResponse.recipe.yield,
      imageUrl: apiResponse.recipe.image, 
      api: EDAMAM_KEY_NAME,
    };
  };
};