import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalStateService } from '../../../../state';
import { UserRecipe } from '../../models/user-recipe.model';
import { UserRecipesStateService } from '../../services/user-recipes-state.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent, FormFieldComponent, LoadingComponent } from '../../../../shared';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IngredientFilterService } from '../../services/ingredient-filter.service';
import { IngredientStateService } from '../../services/ingredient-state.service';
import { API_FORM_FIELD } from '../../../../core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-recipe-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDivider, FormFieldComponent, MatAutocompleteModule, MatTableModule, MatIconModule, MatSelectModule, LoadingComponent, ErrorComponent, MatProgressSpinnerModule],
  templateUrl: './user-recipe-edit.component.html',
  styleUrl: './user-recipe-edit.component.css'
})
export class UserRecipeEditComponent {
  private route = inject(ActivatedRoute);
  private userRecipesStateService = inject(UserRecipesStateService);
  private globalStateService = inject(GlobalStateService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private ingredientFilterService = inject(IngredientFilterService);
  private ingredientStateService = inject(IngredientStateService);

  recipe: UserRecipe | undefined;
  loading = this.globalStateService.loading;
  error = this.globalStateService.error;
  api = API_FORM_FIELD;
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'remove'];
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipe = this.userRecipesStateService.getUserRecipe(id);
      this.populateForm(this.recipe);
      
    };
  };

  populateForm(recipe: UserRecipe | undefined) {
    if (recipe) {
      this.recipeForm.patchValue({
        title: recipe.title,
        instructions: recipe.instructions,
        totalTime: recipe.totalTime,
        servings: recipe.servings,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
      });

      // Clear the current ingredients FormArray
      this.ingredients.clear();

      // Add each ingredient from the recipe to the ingredients FormArray
      recipe.ingredients.forEach(ingredient => {
        const ingredientGroup = this.formBuilder.group({
          name: [ingredient.name],
          quantity: [ingredient.quantity],
          unit: [ingredient.unit]
        });
        this.ingredients.push(ingredientGroup);
      });

      // Update the data source for the table
      this.dataSource.data = this.ingredients.controls;
    };
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
      const updatedRecipe = { id: this.recipe?.id, ...this.recipeForm.value };
      this.userRecipesStateService.updateUserRecipe(updatedRecipe);
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