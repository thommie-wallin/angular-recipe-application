import { Injectable, computed, signal } from '@angular/core';
import { Recipe } from 'app/features/recipes/models/recipe.model';
import data from '../../../../assets/favourites.json';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  // Manage state with signals.
  state = signal<Recipe[]>([]);

  addToFavourites(recipe: Recipe) {
    this.state.update(recipes => [...recipes, recipe]);
  };

  removeFromFavourites(recipe: Recipe) {
    this.state.update(recipes => recipes.filter(item => item.id !== recipe.id));
  };

  removeAllFromFavourites() {
    this.state.set([]);
  };
};