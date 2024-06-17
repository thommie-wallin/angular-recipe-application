import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-recipe-create.component.html',
  styleUrl: './user-recipe-create.component.css'
})
export class UserRecipeCreateComponent {
  private formBuilder = inject(FormBuilder);
  private userRecipesStateService = inject(UserRecipesStateService);
  private router = inject(Router);

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required],
    }),
    instructions: ['', Validators.required],
    totalTime: [0],
    servings: [0],
    description: [''],
    imageUrl: ['assets/images/lemon.jpg'],
  });

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = { id: crypto.randomUUID(), ...this.recipeForm.value };
      this.userRecipesStateService.createUserRecipe(newRecipe);
      this.router.navigate(['/user-recipes']);
    }
  }
}
