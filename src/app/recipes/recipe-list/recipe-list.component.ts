import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from 'app/shared/models/recipe.model';
import { FavouritesService } from '../../core/services/favourites.service';
import { RecipesService } from 'app/core/services/recipes.service';
import { DataService } from 'app/core/services/data.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Observable<any>;
  recipe$: Observable<any>;
  

  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols : number;
  gridByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private favouritesService: FavouritesService,
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private recipeService: RecipesService,

  ) { }

  ngOnInit(): void {
    this.dataService.getSelected().subscribe((selectedCategories) => {
      // this.selected = selectedCategories;
      // this.fetchRecipes(selectedCategories);
    });

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
  }

  fetchRecipes(selectedCategories) {
    // this.recipes = this.recipeService.getSelectedRecipes(selectedCategories);
    // console.log(this.recipes);
    
    // this.recipeService.getSelectedRecipes(selectedCategories)
    // .subscribe({
    //   next: (data) => {
    //       this.recipes = data;
    //       console.log(data);
          
    //   },
    //   error: (error) => {
    //       console.log(error)
    //   },
    //   complete: () => {
    //       console.log('complete')
    //   }
    // })
  };

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this._snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  }
}
