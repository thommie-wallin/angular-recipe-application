import { Injectable, inject, signal } from '@angular/core';
import { Recipe } from 'app/features/recipes/models/recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private snackBar = inject(MatSnackBar);
  // Manage state with signals.
  state = signal<Recipe[]>([]);

  addToFavourites(recipe: Recipe) {
    this.state.update(recipes => [...recipes, recipe]);
    this.snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  };

  removeFromFavourites(recipe: Recipe) {
    this.state.update(recipes => recipes.filter(item => item.id !== recipe.id));
    this.snackBar.open('Recipe removed from favourites.', 'OK', {
      duration: 3000
    });
  };

  removeAllFromFavourites() {
    this.state.set([]);
    this.snackBar.open('All recipes removed from favourites.', 'OK', {
      duration: 3000
    });
  };
};