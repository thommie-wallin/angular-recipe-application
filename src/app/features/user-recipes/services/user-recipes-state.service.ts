import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRecipe } from '../models/user-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserRecipesStateService {
  private snackBar = inject(MatSnackBar);
  state = signal<UserRecipe[]>([
    {
      "id": "8eeab915-5046-4d81-88e4-3f0c8c1760c7",
      "title": "Test Recipe",
      "ingredients": [
          {
              "name": "tomato",
              "quantity": 3,
              "unit": "st"
          },
          {
              "name": "mustard",
              "quantity": 2,
              "unit": "tbs"
          },
          {
              "name": "cucumber",
              "quantity": 1,
              "unit": "st"
          }
      ],
      "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Non consectetur a erat nam at lectus urna duis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Orci sagittis eu volutpat odio facilisis mauris. Vitae sapien pellentesque habitant morbi tristique. Sagittis orci a scelerisque purus semper eget duis at tellus. Augue interdum velit euismod in pellentesque massa. Fermentum et sollicitudin ac orci. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Sem et tortor consequat id porta. Quis risus sed vulputate odio ut enim blandit. Netus et malesuada fames ac.",
      "totalTime": 40,
      "servings": 4,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "imageUrl": "assets/images/lemon.jpg"
    }
  ]);

  // CRUD
  createUserRecipe(recipe: UserRecipe) {
    // console.log(recipe);
    
    this.state.update(recipeList => [...recipeList, recipe]);
    this.snackBar.open('Recipe created.', 'OK', { duration: 3000 });
  };

  getUserRecipe(id: string): UserRecipe | undefined {
    return this.state().find(recipe => recipe.id === id);
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
