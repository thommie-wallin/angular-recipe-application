import { Injectable, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { Recipe } from 'app/models/recipe.model';

@Injectable({
  providedIn: CoreModule
})
export class FavouritesService {
  // Manage state with signals.
  favouriteRecipes = signal<Recipe[]>([]);

  addToFavourites(recipe: Recipe) {
    this.favouriteRecipes.update(recipes => [...recipes, recipe]);
  };

  removeFromFavourites(recipe: Recipe) {
    this.favouriteRecipes.update(recipes => recipes.filter(item => item.id !== recipe.id));
  };

  removeAllFromFavourites() {
    this.favouriteRecipes.set([]);
  };
};