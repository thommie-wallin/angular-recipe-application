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
  recipeDetail$: Observable<RecipeDetail>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.recipeDetail$ = this.recipeDataService.getRecipeDetails(id);
    };
  };
};
