import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { API_FORM_FIELD, FilterService } from 'app/core';
import { RouterModule } from '@angular/router';
import { FavouritesService } from 'app/features/favourites';
import { CommonModule } from '@angular/common';
import { FormFieldComponent, GridListComponent } from 'app/shared';
import { MatDividerModule } from '@angular/material/divider';
import { ResponsiveService } from 'app/core/services/responsive.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RecipesService } from '../../services/recipe-state.service';
import { Recipe } from '../../models/recipe.model';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [CommonModule, MatGridListModule, MatDividerModule, FormFieldComponent, MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule, GridListComponent]
})
export class RecipeListComponent implements OnInit {
  private filterService = inject(FilterService);
  private recipeService = inject(RecipesService);
  private responsiveService = inject(ResponsiveService);
  private favouritesService = inject(FavouritesService);

  recipes = this.recipeService.recipeList;
  filterCategories = this.filterService.getFilterCategories;
  api = API_FORM_FIELD;

  // Grid-list style: Columns per viewportsize in media queries.
  colsNr: number = 5;
  currentStyles: Record<string, string> = {};

  ngOnInit(): void {
    this.responsiveService.colsNr$.subscribe(cols => this.colsNr = cols);

    this.responsiveService.cols$.subscribe(cols => {
      this.currentStyles = {
        'grid-template-columns': cols,
      };
    });
  };

  addToFavourites(recipe: Recipe) {  
    this.favouritesService.addToFavourites(recipe);
  };
};