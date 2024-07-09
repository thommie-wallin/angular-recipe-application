import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { IngredientDataService } from './ingredient-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

export interface IngredientState {
  autocompleteOptions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class IngredientStateService {
  private ingredientDataService = inject(IngredientDataService);

  private state = signal<IngredientState>({
    autocompleteOptions: [],
  });

  // FormControl for the ingredient autocomplete search
  searchControl: FormControl = new FormControl('');

  // Selectors
  autocompleteOptions = computed(() => this.state().autocompleteOptions);

  // Source
  filter$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(query => this.searchIngredients(query))
  );

  constructor() {
    // Reducer
    this.filter$.pipe(takeUntilDestroyed()).subscribe((options) =>
      this.state.set({autocompleteOptions: [...options]})
    );
  };

  // Method to fetch autocomplete options if query isn't an empty string or exist in autocompleteOptions-signal. Otherwise return old autocompleteOptions.
  private searchIngredients(query: string): Observable<string[]> {
    if (!query || !query.trim()) {
      return of([]);
    } 
    else if (!this.autocompleteOptions().includes(query)) {
      return this.ingredientDataService.getIngredientAutocompleteOptions(query).pipe(
        catchError(() => {
          return of([]);
        })
      );
    };
    return of(this.autocompleteOptions());
  };
};
