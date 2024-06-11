import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FavouritesService } from '../../services/favourite-state.service';
import { CommonModule, NgStyle } from '@angular/common';
import { CardComponent, GridListComponent } from '../../../../shared';
import { ResponsiveService } from '../../../../core';
import { Recipe } from '../../../recipes';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule, NgStyle, CommonModule, GridListComponent, CardComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  private favouritesService = inject(FavouritesService);
  private responsiveService = inject(ResponsiveService);
  favourites = this.favouritesService.state;

  // Grid-list style: Columns per viewportsize in media queries.
  // currentStyles: Record<string, string> = {};

  ngOnInit() {
    // this.responsiveService.cols$.subscribe(cols => {
    //   this.currentStyles = {
    //     'grid-template-columns': cols,
    //   };
    // });
  };

  removeFromFavourites(recipe: Recipe) {
    this.favouritesService.removeFromFavourites(recipe);
  };

  removeAllFromFavourites() {
    this.favouritesService.removeAllFromFavourites();
  };
};