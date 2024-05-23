import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeList } from 'app/models/recipe-list.model';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularAdapter {

  adaptToRecipe(apiResponse: any): Recipe {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      ingredients: apiResponse.extendedIngredients.map(ing => ({ name: ing.name, quantity: ing.amount, unit: ing.unit })),
      instructions: apiResponse.instructions,
      instructionSteps: apiResponse.analyzedInstructions,
      totalTime: apiResponse.readyInMinutes,
      servings: apiResponse.servings,
      imageUrl: apiResponse.image,
      thumbnailUrl: null,
      sourceUrl: apiResponse.sourceUrl,
    };
  };

  adaptToRecipes(apiResponse: any[]): RecipeList[] {
    return apiResponse.map(recipe => ({ 
      id: recipe.id, 
      title: recipe.title, 
      imageUrl: recipe.image, 
    }));
  };
};