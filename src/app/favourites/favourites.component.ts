import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from '../core/services/favourites.service'
import { Recipe } from 'app/models/recipe.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {
  private favouritesService = inject(FavouritesService);
  private snackBar = inject(MatSnackBar);
  favourites = this.favouritesService.favouriteRecipes; 

  removeFromFavourites(recipe: Recipe) {
    this.favouritesService.removeFromFavourites(recipe);
    this.snackBar.open('Recipe cleared from favourites.', 'OK', {
      duration: 3000
    });
  };

  removeAllFromFavourites() {
    this.favouritesService.removeAllFromFavourites();
    this.snackBar.open('All recipes cleared from favourites.', 'OK', {
      duration: 3000
    });
  };
};