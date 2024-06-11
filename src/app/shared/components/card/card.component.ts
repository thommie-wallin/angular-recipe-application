import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe, RecipeDataService } from '../../../features/recipes';
import { FavouritesService } from '../../../features/favourites';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // private recipeDataService = inject(RecipeDataService);
  private favouritesService = inject(FavouritesService);
  @Input() recipe: Recipe = {
    id: '',
    title: '',
    imageUrl: '',
    api: ''
  };
  // @Input() currentStyles: Record<string, string> = {};
  // @Input() isFavComponent: boolean = false;
  @Output() onClick = new EventEmitter<Recipe>();

  // Set selected API in data service.
  // setSelectedApi(api: string) {
  //   this.recipeDataService.switchApi(api);
  // };

  onButtonClick(recipe: Recipe) {
    this.onClick.emit(recipe);
  };
}
