import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesService } from '../../services/recipe-state.service';
import { RecipeDataService } from '../../services/recipe-data.service';
import { ErrorComponent, LoadingComponent, SafeHtmlPipe } from '../../../../shared';
import { FavouriteButtonComponent } from '../../../../shared/components/favourite-button/favourite-button.component';
import { GlobalStateService } from '../../../../state';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatIconModule, MatDividerModule, SafeHtmlPipe, FavouriteButtonComponent, LoadingComponent, ErrorComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipesService = inject(RecipesService)
  private recipeDataService = inject(RecipeDataService);
  private globalStateService = inject(GlobalStateService);

  recipeDetail = this.recipesService.recipeDetail;
  loading = this.globalStateService.loading;
  error = this.globalStateService.error;

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
};