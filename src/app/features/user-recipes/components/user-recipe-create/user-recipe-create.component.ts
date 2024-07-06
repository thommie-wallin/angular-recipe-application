import { Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { IngredientFilterService } from '../../services/ingredient-filter.service';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDivider, FormFieldComponent, MatAutocompleteModule, MatTableModule, MatIconModule, MatSelectModule],
  templateUrl: './user-recipe-create.component.html',
  styleUrl: './user-recipe-create.component.css'
})
export class UserRecipeCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userRecipesStateService = inject(UserRecipesStateService);
  private router = inject(Router);
  private ingredientFilterService = inject(IngredientFilterService);

  api = API_FORM_FIELD;
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'remove'];

  // Recipe API selector
  // categoryName: string = '';
  // label: string = '';
  // items: string[] = [];
  apiSelected: string = '';

  changeApiSelected(selectedValue: string) {
    this.ingredientFilterService.changeSelectedApi(selectedValue);
  };

  // Source for updating table when ingredient is added or removed.
  dataSource = new MatTableDataSource<any>();

  // Create an observable for the debounced ingredient name search term value and autocomplete options
  debouncedIngredientSearch$: Observable<string | null> = of('');
  // autocompleteOptions$: Observable<string[]> = of(['']);

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
    name: ['', Validators.required],
    quantity: [null, Validators.min(0)],
    unit: ['']
  });

  ngOnInit() {
    this.setupDebouncedSearchObservable();
    // this.setupAutocompleteOptionsObservable();
  };

  setupDebouncedSearchObservable() {
    this.debouncedIngredientSearch$ = this.ingredientForm.get('name')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // Filter out null or undefined values preventing errors and redundant API requests.
      filter((name: string | null) => name !== null && name !== undefined)
    );
  };

  setupAutocompleteOptionsObservable() {
    // this.autocompleteOptions$ = this.debouncedIngredientSearch$.pipe(
    //   switchMap(name => this.fetchAutocompleteOptions(name))
    // );
    this.debouncedIngredientSearch$.pipe(
      
      // this.ingredientFilterService.updateFilter(data)
      // switchMap(name => this.fetchAutocompleteOptions(name))
      
    );
  };

  // fetchAutocompleteOptions(name: string | null): Observable<string[]> {
  //   // Handle the case where name is null or empty
  //   if (!name || !name.trim()) {
  //     return of([]);
  //   }

  //   // Replace this with your actual API call
  //   // return this.userRecipesStateService.getAutocompleteOptions(name);
  //   return of(['test', 'test2', 'test3']);
  // };

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