import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from 'app/core/services/favourites.service';
import { Recipe } from '../../models/recipe.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterService } from 'app/core/services/filter.service';
import { API_FORM_FIELD } from 'app/shared/constants/ui';
import { SharedModule } from 'app/shared/shared.module';
import { RecipesService } from 'app/core/services/recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    SharedModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  private filterService = inject(FilterService);
  private recipeService = inject(RecipesService);
  private breakpointObserver = inject(BreakpointObserver);
  private favouritesService = inject(FavouritesService);
  private _snackBar = inject(MatSnackBar);
  // recipeList = input<Recipe[]>();
  recipes = this.recipeService.recipeList;
  filterCategories = this.filterService.getFilterCategories;

  // protected filterService = inject(FilterService);
  api = API_FORM_FIELD;

  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols : number;
  gridByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  ngOnInit(): void {
    // Angular Material Component Dev Kit (CDK): Layout behaviour primitives with Material Designs breakpoint system. 
    // The breakpointobserver utility with the observe method evaluate default media queries from the breakpoint system 
    // which will emit when one of them changes its boolean value. If a media query emits a boolean value of true, the different
    // if statements check which media querys condition is truthy. Then the cols variable is set to a corresponding number 
    // value from the gridByBreakpoint object.
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  };

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this._snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  };
}
