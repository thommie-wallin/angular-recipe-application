import { Component, OnInit, inject, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';
import { Selected } from 'app/shared/interfaces';
import { RecipesService } from 'app/core/services/recipes.service';
import { RecipeDataService } from 'app/services/recipe-data.service';
import { RecipeDetail } from 'app/models/recipe.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeDataService = inject(RecipeDataService);

  recipeId: string = this.route.snapshot.paramMap.get('id');

  //? Send observable from route 

  // recipeId: string;

  recipeDetail: RecipeDetail;
  // recipeDetail$: Observable<RecipeDetail>;


  // recipe$: Observable<Recipe>;

  // constructor(
  //   // private dataService: DataService, 
  //   // private recipeService: RecipesService, 
  //   // private route: ActivatedRoute
  // ) {}

  ngOnInit(): void {
    // this.recipeId = this.route.snapshot.paramMap.get('id');

    // this.recipeDataService.getRecipeDetails(this.recipeId).subscribe(data => {
    //   this.recipeDetail = data;
    //   console.log(data);
    // });

    // this.recipeDataService.getRecipeDetails(this.recipeId);
    
    // console.log(this.recipeDetail);
    
    // this.dataService.getSelected().subscribe((selectedCategories) => {
    //   this.getRecipe(selectedCategories);
    // });
  };

  // ngOnDestroy(): void {
  //   this.recipeDataService.getRecipeDetails.unsubscribe();
  // };

  // getRecipe(selectedCategories: Selected): void {
  //   this.recipeId = this.route.snapshot.paramMap.get('id');
  //   // this.recipe$ = this.recipeService.getOneRecipe(this.recipeId, selectedCategories);
  // };
};
