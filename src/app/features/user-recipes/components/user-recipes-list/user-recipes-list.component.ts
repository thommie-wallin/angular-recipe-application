import { Component, inject } from '@angular/core';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { CardComponent, GridListComponent } from '../../../../shared';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recipes-list',
  standalone: true,
  imports: [CommonModule, MatDivider, GridListComponent, CardComponent, MatButtonModule],
  templateUrl: './user-recipes-list.component.html',
  styleUrl: './user-recipes-list.component.css'
})
export class UserRecipesListComponent {
  private userRecipeStateService = inject(UserRecipesStateService);
  private router = inject(Router);
  userRecipes = this.userRecipeStateService.state;

  onClickCreateBtn() {
    this.router.navigate(['/user-recipes/create']);
  };

  deleteAllUserRecipes() {
    this.userRecipeStateService.deleteAllUserRecipes();
  };
};