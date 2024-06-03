import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FavouritesService } from '../../services/favourite-state.service';
import { ResponsiveService } from 'app/core';
import { CommonModule, NgStyle } from '@angular/common';
import { GridListComponent } from 'app/shared';
import { Recipe } from 'app/features/recipes';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule, NgStyle, CommonModule, GridListComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  private favouritesService = inject(FavouritesService);
  private snackBar = inject(MatSnackBar);
  private responsiveService = inject(ResponsiveService);
  favourites = this.favouritesService.state;

  // Grid-list style: Columns per viewportsize in media queries.
  currentStyles: Record<string, string> = {};

  ngOnInit() {
    this.responsiveService.cols$.subscribe(cols => {
      this.currentStyles = {
        'grid-template-columns': cols,
      };
    });
  };

  removeFromFavourites(recipe: Recipe) {
    this.favouritesService.removeFromFavourites(recipe);
    this.snackBar.open('Recipe removed from favourites.', 'OK', {
      duration: 3000
    });
  };

  removeAllFromFavourites() {
    this.favouritesService.removeAllFromFavourites();
    this.snackBar.open('All recipes removed from favourites.', 'OK', {
      duration: 3000
    });
  };
};