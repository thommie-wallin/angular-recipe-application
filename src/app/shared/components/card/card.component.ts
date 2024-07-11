import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { Recipe } from '../../../features/browse';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserRecipesStateService } from '../../../features/user-recipes';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, RouterModule, FavouriteButtonComponent, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private router = inject(Router);
  private userRecipeStateService = inject(UserRecipesStateService);
  
  @Input() recipe: Recipe = {
    id: '',
    title: '',
    imageUrl: '',
    api: ''
  };

  onCLickEditBtn(id: string) {
    this.router.navigate(['/user-recipes/edit', id]);
  };

  onCLickDeleteBtn(id: string) {
    this.userRecipeStateService.deleteUserRecipe(id);
  };
};