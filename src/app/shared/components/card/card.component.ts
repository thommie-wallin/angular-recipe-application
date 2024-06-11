import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../features/recipes';
import { FavouritesService } from '../../../features/favourites';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private favouritesService = inject(FavouritesService);
  isFavourite: boolean = false;
  @Input() recipe: Recipe = {
    id: '',
    title: '',
    imageUrl: '',
    api: ''
  };

  ngOnInit() {
    this.isFavourite = this.favouritesService.isFavourite(this.recipe.id);
  };

  get icon(): string {
    return this.isFavourite ? 'delete' : 'favorite';
  };

  toggleFavourite() {
    if (this.isFavourite) {
      this.favouritesService.removeFromFavourites(this.recipe);
    } else {
      this.favouritesService.addToFavourites(this.recipe);
    }
    this.isFavourite = !this.isFavourite;
  };
};