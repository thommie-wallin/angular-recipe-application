import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe, RecipeDataService } from 'app/features/recipes';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent {
  private recipeDataService = inject(RecipeDataService);
  @Input() recipes: Recipe[] = [];
  @Input() currentStyles: Record<string, string> = {};
  @Input() isFavComponent: boolean = false;
  @Output() recipe = new EventEmitter<Recipe>();

  // Set selected API in data service.
  setSelectedApi(api: string) {
    this.recipeDataService.switchApi(api);
  };

  onButtonClick(recipe: Recipe) {
    this.recipe.emit(recipe);
  };
};
