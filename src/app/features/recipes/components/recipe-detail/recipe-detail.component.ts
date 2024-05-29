import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavouritesService } from 'app/core/services/favourites.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipeDetailService } from 'app/state/recipe-detail.service';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private favouritesService = inject(FavouritesService);
  private recipeDetailService = inject(RecipeDetailService);
  private snackBar = inject(MatSnackBar);
  recipeDetail = this.recipeDetailService.recipeDetail;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getRecipeId(id);
    };
  };

  getRecipeId(id: string) {
    this.recipeDetailService.setRecipeId(id);
  };

  addToFavourites(recipe: Recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this.snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  };
};