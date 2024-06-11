import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RecipesService } from '../../services/recipe-state.service';
import { Recipe } from '../../models/recipe.model';
import { API_FORM_FIELD, FilterService, ResponsiveService } from '../../../../core';
import { FavouritesService } from '../../../favourites';
import { CardComponent, FormFieldComponent, GridListComponent } from '../../../../shared';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [CommonModule, MatGridListModule, MatDividerModule, FormFieldComponent, MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule, GridListComponent, CardComponent]
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