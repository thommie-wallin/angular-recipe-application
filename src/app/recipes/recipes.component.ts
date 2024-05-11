import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataService } from '../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';
import { Selected } from 'app/shared/interfaces';
import { RecipesService } from 'app/core/services/recipes.service';
import { SPOONACULAR_MEAL_TYPES } from 'app/shared/constants/ui';
import { FilterService } from 'app/core/services/filter.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // recipes: Observable<Recipe>;
  recipes: Observable<any>;
  selected: Selected;

  mealTypes = SPOONACULAR_MEAL_TYPES;
  // label = 'mealType';
  // categories = CATEGORIES;
  // labels = CATEGORIES_LABELS;

  service = inject(FilterService);
  

  // Angular Material Grid list: Columns per viewportsize in media queries.
  // cols: number;
  // gridByBreakpoint = {
  //   xl: 3,
  //   lg: 3,
  //   md: 3,
  //   sm: 2,
  //   xs: 1
  // }

  constructor(private filterService: FilterService, private dataService: DataService, private recipeService: RecipesService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.dataService.getSelected().subscribe((selectedCategories) => {
      this.selected = selectedCategories;
      // this.fetchRecipes(selectedCategories);
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
