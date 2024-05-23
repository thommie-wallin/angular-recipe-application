import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeList } from 'app/models/recipe-list.model';

@Injectable({
  providedIn: 'root'
})
export class EdamamAdapter {

  adaptToRecipes(apiResponse: any): RecipeList[] {
    return apiResponse.hits.recipe.map(recipe => ({ 
      id: recipe.uri.split('#recipe_').pop(), 
      title: recipe.label, 
      imageUrl: recipe.image, 
    }));
  };

  adaptToRecipe(apiResponse: any): Recipe {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      ingredients: apiResponse.ingredients.map(ing => ({ name: ing.text, quantity: ing.quantity, unit: ing.measure })),
      instructions: apiResponse.instructions,
      instructionSteps: null,
      totalTime: null,
      servings: apiResponse.yield,
      imageUrl: apiResponse.image,
      thumbnailUrl: apiResponse.images.THUMBNAIL.url,
      sourceUrl: apiResponse.url,
    };
  };
};