import { Component, Input, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from 'app/features/favourites';
import { RecipeDetail } from 'app/features/recipes/models/recipe.model';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  private favouritesService = inject(FavouritesService);
  private _snackBar = inject(MatSnackBar);
  @Input() recipeDetail: RecipeDetail;

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this._snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  };
}
