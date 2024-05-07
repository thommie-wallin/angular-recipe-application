import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataService } from '../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';
import { Selected } from 'app/shared/interfaces';
import { RecipesService } from 'app/core/services/recipes.service';
import { SPOONACULAR_MEAL_TYPES } from 'app/shared/constants/ui';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // recipes: Observable<Recipe>;
  recipes: Observable<any>;
  selected: Selected;

  // mealTypes = SPOONACULAR_MEAL_TYPES;
  // labelTest = 'Label Test';
  

  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols: number;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(private dataService: DataService, private recipeService: RecipesService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.dataService.getSelected().subscribe((selectedCategories) => {
      this.selected = selectedCategories;
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
}
