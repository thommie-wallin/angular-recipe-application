import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipe-state.service';
import { RecipeDataService } from '../../services/recipe-data.service';
import { FavouritesService } from '../../../favourites';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from '../../../../shared';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, SafeHtmlPipe],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private favouritesService = inject(FavouritesService);
  private recipesService = inject(RecipesService)
  private recipeDataService = inject(RecipeDataService);

  recipeDetail = this.recipesService.recipeDetail;
  trustedHtml: any;

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