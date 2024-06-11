import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FavouritesService } from '../../services/favourite-state.service';
import { CommonModule } from '@angular/common';
import { CardComponent, GridListComponent } from '../../../../shared';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule, CommonModule, GridListComponent, CardComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  private favouritesService = inject(FavouritesService);
  favourites = this.favouritesService.state;

  removeAllFromFavourites() {
    this.favouritesService.removeAllFromFavourites();
  };
};