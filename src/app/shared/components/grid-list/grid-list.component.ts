import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe } from 'app/features/recipes';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent {
  @Input() recipes: Recipe[];
  @Input() currentStyles: Record<string, string> = {};
  @Input() isFavComponent: boolean;
  @Output() recipe = new EventEmitter<Recipe>();

  onButtonClick(recipe: Recipe) {
    this.recipe.emit(recipe);
  };
};
