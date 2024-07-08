import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { IngredientFilterService } from './ingredient-filter.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { IngredientDataService } from './ingredient-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserRecipeCreateComponent } from '../components/user-recipe-create/user-recipe-create.component';
import { FormControl } from '@angular/forms';

export interface IngredientState {
  autocompleteOptions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class IngredientStateService {
  private ingredientFilterService = inject(IngredientFilterService);
  private ingredientDataService = inject(IngredientDataService);
  // private userRecipeCreateComponent = inject(UserRecipeCreateComponent);

  private state = signal<IngredientState>({
    autocompleteOptions: [],
  });

  // FormControl for the ingredient search
  searchControl: FormControl = new FormControl('');

  // Selectors
  autocompleteOptions = computed(() => this.state().autocompleteOptions);

  

  // Source
  // private ingredientAutocompleteOptions$ = this.userRecipeCreateComponent.debouncedIngredientSearch$.pipe(
  //   switchMap(selectedApi => this.ingredientDataService.getIngredientAutocompleteOptions(selectedApi))
  // );

  filter$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(query => this.searchIngredients(query))
  );

  // searchIngredients(query: string): void {
  //   this.ingredientDataService.getIngredientAutocompleteOptions(query).subscribe(
  //     ingredients => this.ingredientsSubject.next(ingredients),
  //     error => console.error('Error fetching ingredients:', error)
  //   );
  // }

  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.state().autocompleteOptions}`);
    });

    // console.log(this.filter$);
    

    // Reducer
    // this.ingredientAutocompleteOptions$.pipe(takeUntilDestroyed()).subscribe((data) => 
    //   this.state.set(data)
    // );

    this.filter$.pipe(takeUntilDestroyed()).subscribe((options) =>
      // console.log(options)
      
      // this.state.update(() => ({
      //   autocompleteOptions: [...options],
      // })),
      // console.log()
      
      this.state.set({autocompleteOptions: [...options]})
    );
  };

  // Method to fetch autocomplete options
  private searchIngredients(query: string): Observable<string[]> {
    if (!query || !query.trim()) {
      return of([]);
    }

    return this.ingredientDataService.getIngredientAutocompleteOptions(query).pipe(
      catchError(error => {
        console.error('Error fetching ingredients:', error);
        return of([]);
      })
    );
  }
};
