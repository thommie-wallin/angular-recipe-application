import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Recipe } from '../../models/recipe.model';
import { FavouritesService } from 'app/features/favourites';
import { RecipesService } from '../../services/recipe-state.service';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private favouritesService = inject(FavouritesService);
  private recipesService = inject(RecipesService)
  private recipeDataService = inject(RecipeDataService);
  recipeDetail = this.recipesService.recipeDetail;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const api = params['api'];

      // Change selected API in data service.
      this.recipeDataService.switchApi(api);

      this.fetchRecipe(id);
    });
  };

  fetchRecipe(id: string) {
    this.recipesService.setRecipeId(id);
  };

  addToFavourites(recipe: Recipe) {  
    this.favouritesService.addToFavourites(recipe);
  };
};