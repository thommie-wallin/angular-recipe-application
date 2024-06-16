import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRecipe } from '../models/user-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserRecipesStateService {
  private snackBar = inject(MatSnackBar);
  state = signal<UserRecipe[]>([]);

  // CRUD
  createUserRecipe(recipe: UserRecipe) {
    this.state.update(recipeList => [...recipeList, recipe]);
    this.snackBar.open('Recipe created.', 'OK', { duration: 3000 });
  };

  updateUserRecipe(recipe: UserRecipe) {
    this.state.update(recipeList => recipeList.map(item => item.id === recipe.id ? recipe : item));
    this.snackBar.open('Recipe updated.', 'OK', { duration: 3000 });
  };

  deleteUserRecipe(id: string) {
    this.state.update(recipeList => recipeList.filter(item => item.id !== id));
    this.snackBar.open('Recipe removed.', 'OK', { duration: 3000 });
  };

  deleteAllUserRecipes() {
    this.state.set([]);
    this.snackBar.open('All recipes removed.', 'OK', { duration: 3000 });
  };
}
