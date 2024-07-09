import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { ErrorComponent, FormFieldComponent, LoadingComponent } from '../../../../shared';
import { API_FORM_FIELD } from '../../../../core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { IngredientFilterService } from '../../services/ingredient-filter.service';
import { IngredientStateService } from '../../services/ingredient-state.service';
import { GlobalStateService } from '../../../../state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDivider, FormFieldComponent, MatAutocompleteModule, MatTableModule, MatIconModule, MatSelectModule, LoadingComponent, ErrorComponent, MatProgressSpinnerModule],
  templateUrl: './user-recipe-create.component.html',
  styleUrl: './user-recipe-create.component.css'
})
export class UserRecipeCreateComponent {
  private formBuilder = inject(FormBuilder);
  private userRecipesStateService = inject(UserRecipesStateService);
  private router = inject(Router);
  private ingredientFilterService = inject(IngredientFilterService);
  private ingredientStateService = inject(IngredientStateService);
  private globalStateService = inject(GlobalStateService);

  api = API_FORM_FIELD;
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'remove'];
  loading = this.globalStateService.loading;
  error = this.globalStateService.error;
  apiSelected = this.ingredientFilterService.api;
  ingredientAutocompleteOptions = this.ingredientStateService.autocompleteOptions;

  // Source for updating table when ingredient is added or removed.
  dataSource = new MatTableDataSource<any>();

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.array([]),
    instructions: ['', Validators.required],
    totalTime: [null, Validators.min(0)],
    servings: [null, Validators.min(0)],
    description: [''],
    imageUrl: ['assets/images/lemon.jpg'],
  }, { validators: atLeastOneIngredientValidator });

  // Static form controls for adding a new ingredient. Used to collect input from the user for a single ingredient before it is added to the main ingredients array in the recipeForm.
  ingredientForm: FormGroup = this.formBuilder.group({
    name: this.ingredientStateService.searchControl,
    quantity: [null, Validators.min(0)],
    unit: ['']
  });

  // Retrieve ingredients form array from parent form group.
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };

  changeApiSelected(selectedValue: string) {
    this.ingredientFilterService.changeSelectedApi(selectedValue);
  };

  addIngredient() {
    if (this.ingredientForm.valid) {
      const ingredient: FormGroup = this.formBuilder.group({
        name: [this.ingredientForm.value.name],
        quantity: [this.ingredientForm.value.quantity],
        unit: [this.ingredientForm.value.unit]
      });
      this.ingredients.push(ingredient);

      // Update data source and ingredients table
      this.dataSource.data = this.ingredients.controls;

      this.ingredientForm.reset();
    };
  };

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);

    // Update data source and ingredients table
    this.dataSource.data = this.ingredients.controls;
  };

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = { id: crypto.randomUUID(), ...this.recipeForm.value };
      this.userRecipesStateService.createUserRecipe(newRecipe);
      this.router.navigate(['/user-recipes']);
    } else {
      // Mark all controls as touched to show validation messages.
      this.recipeForm.markAllAsTouched();  
    };
  };
};

function atLeastOneIngredientValidator(control: AbstractControl): ValidationErrors | null {
  const ingredients = control.get('ingredients') as FormArray;
  return ingredients && ingredients.length > 0 ? null : { noIngredients: true };
};