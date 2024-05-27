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
      id: apiResponse.recipe.uri.split('#recipe_').pop(),
      title: apiResponse.recipe.label, 
      ingredients: apiResponse.recipe.ingredients.map(ing => ({ 
        name: ing.food, 
        quantity: ing.quantity, 
        unit: ing.measure.includes('<') ? null : ing.measure,
      })),
      instructions: apiResponse.recipe.url,
      totalTime: (apiResponse.recipe.totalTime),
      servings: apiResponse.recipe.yield,
      imageUrl: apiResponse.recipe.image, 
    };
  };
};