import { Injectable } from '@angular/core';
import { Recipe, RecipeDetail } from 'app/features/recipes/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularAdapter {

  adaptToRecipe(apiResponse: any): Recipe {
    return { 
      id: apiResponse.id.toString(), 
      title: apiResponse.title, 
      imageUrl: apiResponse.image, 
    };
  };

  adaptToRecipeList(apiResponse: any): Recipe[] {
    return apiResponse.results.map(this.adaptToRecipe);
  };

  adaptToRecipeDetail(apiResponse: any): RecipeDetail {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      ingredients: apiResponse.extendedIngredients.map(ing => ({ name: ing.name, quantity: ing.amount, unit: ing.unit })),
      instructions: apiResponse.instructions,
      totalTime: apiResponse.readyInMinutes,
      servings: apiResponse.servings,
      imageUrl: apiResponse.image,
    };
  };
};