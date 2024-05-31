import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterService } from 'app/core/services/filter.service';
import { API_FORM_FIELD } from 'app/core/constants/api';
import { RecipesService } from 'app/features/recipes/services/recipe-state.service';
import { RouterModule } from '@angular/router';
import { FavouritesService } from 'app/features/favourites';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from 'app/shared';
import { MatDividerModule } from '@angular/material/divider';
import { ResponsiveService } from 'app/core/services/responsive.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [CommonModule, MatGridListModule, MatDividerModule, FormFieldComponent, MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule]
})
export class RecipeListComponent implements OnInit {
  private filterService = inject(FilterService);
  private recipeService = inject(RecipesService);
  private responsiveService = inject(ResponsiveService);
  private favouritesService = inject(FavouritesService);
  private snackBar = inject(MatSnackBar);
  recipes = this.recipeService.recipeList;
  filterCategories = this.filterService.getFilterCategories;
  api = API_FORM_FIELD;

  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols: number;

  ngOnInit(): void {
    this.responsiveService.cols$.subscribe(cols => this.cols = cols);
  };

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this.snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  };
}
