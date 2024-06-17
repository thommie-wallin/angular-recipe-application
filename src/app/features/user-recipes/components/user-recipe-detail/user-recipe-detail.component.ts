import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';
import { UserRecipe } from '../../models/user-recipe.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FavouriteButtonComponent, LoadingComponent, SafeHtmlPipe } from '../../../../shared';

@Component({
  selector: 'app-user-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatIconModule, MatDividerModule, FavouriteButtonComponent, LoadingComponent, SafeHtmlPipe],
  templateUrl: './user-recipe-detail.component.html',
  styleUrl: './user-recipe-detail.component.css'
})
export class UserRecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userRecipesStateService = inject(UserRecipesStateService);

  recipe: UserRecipe | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipe = this.userRecipesStateService.getUserRecipe(id);
    };
  };
};