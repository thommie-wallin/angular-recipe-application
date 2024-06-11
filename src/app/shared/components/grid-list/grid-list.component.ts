import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe, RecipeDataService } from '../../../features/recipes';
import { CardComponent } from '../card/card.component';
import { ResponsiveService } from '../../../core';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, CardComponent],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent implements OnInit {
  private responsiveService = inject(ResponsiveService);
  currentStyles: Record<string, string> = {};

  ngOnInit(): void {
    this.responsiveService.cols$.subscribe(cols => {
      this.currentStyles = {
        'grid-template-columns': cols,
        'grid-auto-rows': '1fr'
      };
    });
  };
  // private recipeDataService = inject(RecipeDataService);
  // @Input() recipes: Recipe[] = [];
  // @Input() currentStyles: Record<string, string> = {};
  // @Input() isFavComponent: boolean = false;
  // @Output() recipe = new EventEmitter<Recipe>();

  // Set selected API in data service.
  // setSelectedApi(api: string) {
  //   this.recipeDataService.switchApi(api);
  // };

  // onButtonClick(recipe: Recipe) {
  //   this.recipe.emit(recipe);
  // };
};
