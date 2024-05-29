import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from '../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';
import { Selected } from 'app/shared/interfaces';
import { RecipesService } from 'app/state/recipes.service';
import { FilterService } from 'app/core/services/filter.service';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeDataService } from 'app/features/recipes/services/recipe-data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  private filterService = inject(FilterService);
  protected recipeService = inject(RecipesService);
  recipes: Observable<any>;
  selected: Selected;

  // mealTypes = SPOONACULAR_MEAL_TYPES;
  // label = 'mealType';
  // categories = CATEGORIES;
  // labels = CATEGORIES_LABELS;

  // filterService = inject(FilterService);
  

  // Angular Material Grid list: Columns per viewportsize in media queries.
  // cols: number;
  // gridByBreakpoint = {
  //   xl: 3,
  //   lg: 3,
  //   md: 3,
  //   sm: 2,
  //   xs: 1
  // }

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.dataService.getSelected().subscribe((selectedCategories) => {
      this.selected = selectedCategories;
      // this.fetchRecipes(selectedCategories);
    });

    this.filterService.state$.subscribe((filterState) => {
      // this.recipeService.fetchRecipeList(filterState);
    })
    
    // this.recipeService.filteredRecipes()
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
