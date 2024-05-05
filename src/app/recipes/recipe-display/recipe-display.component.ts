import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';
import { Selected } from 'app/shared/interfaces';
import { RecipesService } from 'app/core/services/recipes.service';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent {
  recipeId;
  recipe$: Observable<Recipe>;

  constructor(private dataService: DataService, private recipeService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataService.getSelected().subscribe((selectedCategories) => {
      this.getRecipe(selectedCategories);
    });
  };

  getRecipe(selectedCategories: Selected): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipeService.getOneRecipe(this.recipeId, selectedCategories);
  };
};
