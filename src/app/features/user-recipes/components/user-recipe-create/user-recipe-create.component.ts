import { Component, inject, signal } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDivider, FormFieldComponent, MatAutocompleteModule, MatTableModule, MatIconModule],
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
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'remove'];

  // Source for updating table when ingredient is added or removed.
  dataSource = new MatTableDataSource<any>();

  // ingredients = signal<Ingredients[]>([]);

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.array([]),
    instructions: ['', Validators.required],
    totalTime: [null, Validators.min(0)],
    servings: [null, Validators.min(0)],
    description: [''],
    imageUrl: ['assets/images/lemon.jpg'],
  });

  // Static form controls for adding a new ingredient. Used to collect input from the user for a single ingredient before it is added to the main ingredients array in the recipeForm.
  ingredientForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    quantity: [null, Validators.min(0)],
    unit: ['']
  });

  // Retrieve ingredients form array from parent form group.
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };

  addIngredient() {
    if (this.ingredientForm.valid) {
      const ingredient: FormGroup = this.formBuilder.group({
        name: [this.ingredientForm.value.name],
        quantity: [this.ingredientForm.value.quantity],
        unit: [this.ingredientForm.value.unit]
      });
      this.ingredients.push(ingredient);
      this.dataSource.data = this.ingredients.controls;  // Update data source
      this.ingredientForm.reset();
    };
  };

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
    this.dataSource.data = this.ingredients.controls;  // Update data source
  };

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = { id: crypto.randomUUID(), ...this.recipeForm.value };
      this.userRecipesStateService.createUserRecipe(newRecipe);
      this.router.navigate(['/user-recipes']);
    };
  };
};
