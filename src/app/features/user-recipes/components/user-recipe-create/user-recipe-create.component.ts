import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { FormFieldComponent } from '../../../../shared';
import { API_FORM_FIELD } from '../../../../core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ingredients } from '../../models/user-recipe.model';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDivider, FormFieldComponent, MatAutocompleteModule],
  templateUrl: './user-recipe-create.component.html',
  styleUrl: './user-recipe-create.component.css'
})
export class UserRecipeCreateComponent {
  private formBuilder = inject(FormBuilder);
  private userRecipesStateService = inject(UserRecipesStateService);
  private router = inject(Router);

  api = API_FORM_FIELD;
  autocompleteOptions: string[] = [];
  searchTerm: string = '';

  // ingredients: Ingredients[] = [{
  //   name: '',
  //   quantity: 0,
  //   unit: ''
  // }];

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    // ingredients: this.formBuilder.group({
    //   name: ['', Validators.required],
    //   quantity: [0, Validators.required],
    //   unit: ['', Validators.required],
    // }),
    ingredients: this.formBuilder.array([this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required]
    })]),
    instructions: ['', Validators.required],
    totalTime: [0, Validators.required],
    servings: [0, Validators.required],
    description: ['', Validators.required],
    imageUrl: ['assets/images/lemon.jpg'],
  });

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };

  addIngredient() {
    const ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required]
    });

    this.ingredients.push(ingredientForm);
  };

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  };

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = { id: crypto.randomUUID(), ...this.recipeForm.value };
      this.userRecipesStateService.createUserRecipe(newRecipe);
      this.router.navigate(['/user-recipes']);
    }

    // console.log(this.recipeForm.value.ingredients);
    
  };
};
