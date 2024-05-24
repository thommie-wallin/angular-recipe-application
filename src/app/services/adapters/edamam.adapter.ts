import { Injectable } from '@angular/core';
import { Recipe, RecipeDetail } from 'app/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class EdamamAdapter {

  adaptToRecipe(apiResponse: any): Recipe {
    return { 
      id: apiResponse.recipe.uri.split('#recipe_').pop(),
      title: apiResponse.recipe.label, 
      imageUrl: apiResponse.recipe.image, 
    };
  };

  adaptToRecipeList(apiResponse: any): Recipe[] {
    return apiResponse.hits.map(this.adaptToRecipe);
  }

  adaptToRecipeDetail(apiResponse: any): RecipeDetail {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      ingredients: apiResponse.ingredients.map(ing => ({ name: ing.text, quantity: ing.quantity, unit: ing.measure })),
      instructions: apiResponse.instructions,
      totalTime: null,
      servings: apiResponse.yield,
      imageUrl: apiResponse.image,
    };
  };
};