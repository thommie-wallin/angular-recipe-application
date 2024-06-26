import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Recipe, RecipeDetail } from '../../../features/browse';
import { FavouritesService } from '../../../features/favourites';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favourite-button',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './favourite-button.component.html',
  styleUrl: './favourite-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteButtonComponent implements OnInit {
  private favouritesService = inject(FavouritesService);

  @Input() recipe: Recipe | RecipeDetail = { id: '', title: '', imageUrl: '', api: '' };
  isFavourite: boolean = false;

  ngOnInit() {
    this.isFavourite = this.favouritesService.isFavourite(this.recipe.id);
  };

  ngOnChanges() {
    this.isFavourite = this.favouritesService.isFavourite(this.recipe.id);
  };

  get icon(): string {
    return this.isFavourite ? 'delete' : 'favorite';
  };

  toggleFavourite() {
    if (this.isFavourite) {
      this.favouritesService.removeFromFavourites(this.recipe);
      this.isFavourite = false;
    } else {
      this.favouritesService.addToFavourites(this.recipe);
      this.isFavourite = true;
    };
  };
};