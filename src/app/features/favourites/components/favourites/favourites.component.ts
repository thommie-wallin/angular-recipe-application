import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Recipe } from 'app/features/recipes';
import { FavouritesService } from '../../services/favourite-state.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  private favouritesService = inject(FavouritesService);
  private snackBar = inject(MatSnackBar);
  favourites = this.favouritesService.state;

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