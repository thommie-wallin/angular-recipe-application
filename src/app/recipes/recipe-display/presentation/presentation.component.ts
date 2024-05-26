import { Component, OnInit, Input, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from 'app/shared/models/recipe.model';
import { FavouritesService } from '../../../core/services/favourites.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  private favouritesService = inject(FavouritesService);
  private _snackBar = inject(MatSnackBar);
  recipeDetail = input();
  // @Input() recipe: Recipe;

  constructor(
    // private favouritesService: FavouritesService,
    // private _snackBar: MatSnackBar,
  ) { }

  // ngOnInit(): void {
  // }

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this._snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  }

}
