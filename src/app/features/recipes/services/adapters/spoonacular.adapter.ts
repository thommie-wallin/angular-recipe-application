import { Injectable } from '@angular/core';
import { Recipe, RecipeDetail } from '../../models/recipe.model';
import { SPOONACULAR_KEY_NAME } from '../../../../core';

interface Ingredient { 
  name: string; 
  amount: number; 
  unit: string; 
}

@Injectable({
  providedIn: 'root'
})
export class SpoonacularAdapter {

  adaptToRecipe(apiResponse: any): Recipe {
    return { 
      id: apiResponse.id.toString(), 
      title: apiResponse.title, 
      imageUrl: apiResponse.image, 
      api: SPOONACULAR_KEY_NAME,
    };
  };

  adaptToRecipeList(apiResponse: any): Recipe[] {
    return apiResponse.results.map(this.adaptToRecipe);
  };

  adaptToRecipeDetail(apiResponse: any): RecipeDetail {
    return {
      id: apiResponse.id.toString(),
      title: apiResponse.title,
      ingredients: apiResponse.extendedIngredients.map((ing: Ingredient)  => ({ 
        name: ing.name, 
        quantity: ing.amount.toString().length > 4 ? ing.amount.toFixed(2) : ing.amount, 
        unit: ing.unit 
      })),
      instructions: apiResponse.instructions,
      totalTime: apiResponse.readyInMinutes,
      servings: apiResponse.servings,
      imageUrl: apiResponse.image,
      api: SPOONACULAR_KEY_NAME,
    };
  };
};