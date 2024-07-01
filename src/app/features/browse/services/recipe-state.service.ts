import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { FilterService } from '../../../core/services/filter.service';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { RecipeDataService } from './recipe-data.service';
import { Recipe, RecipeDetail } from '../models/recipe.model';
import { EMPTY, of } from 'rxjs';
import { GlobalStateService } from '../../../state';



export interface RecipeState {
  recipeList: Recipe[];
  recipeDetail: RecipeDetail;
  recipeId: string;
};

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipeDataService = inject(RecipeDataService);
  private filterService = inject(FilterService);
  private globalStateService = inject(GlobalStateService);

  private state = signal<RecipeState>({
    recipeList: [],
    recipeDetail: {
      id: '',
      title: '',
      ingredients: [],
      instructions: '',
      totalTime: 0,
      servings: 0,
      imageUrl: '',
      api: '',
      sourceName: '',
      sourceUrl: '',
    },
    recipeId: '',
  });

  // selectors
  recipeList = computed(() => this.state().recipeList);
  recipeDetail = computed(() => this.state().recipeDetail);
  recipeId = computed(() => this.state().recipeId);

  // sources
  private recipesForList$ = this.filterService.state$.pipe(
    switchMap(filterState => this.recipeDataService.getRecipesList(filterState)),
    retry(2),
    catchError(error => {
      const sanitizedError = this.sanitizeError(error.message || 'An error occurred');
      this.globalStateService.setError(sanitizedError);

      // Return an empty list in case of error
      return of([]);
    }),
  );

  private recipeDetail$ = toObservable(this.recipeId).pipe(
    switchMap(recipeId => {
      // If recipeId-state is null return empty observable.
      if (!recipeId) {
        return EMPTY;
      };
      return this.recipeDataService.getRecipeDetails(recipeId).pipe(
        catchError(error => {
          const sanitizedError = this.sanitizeError(error.message || 'An error occurred');
          this.globalStateService.setError(sanitizedError);

          // Return an empty observable in case of error
          return EMPTY;
        })
      );
    }),
  );

  private apiChange$ = this.filterService.selectedApi$;

  constructor(
  ) {
    // reducers
    this.recipesForList$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeList: data,
      }))
    );

    // Reset recipeList when switching recipe-api.
    this.apiChange$.pipe(takeUntilDestroyed()).subscribe(() =>
      this.state.update((state) => ({
        ...state,
        recipeList: [],
      }))
    );

    this.recipeDetail$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeDetail: data,
      }))
    );
  };

  setRecipeId(id: string) {
    this.state.update((state) => ({
      ...state,
      recipeId: id,
    }))
  };

  private sanitizeError(error: any): string {
    let errorMessage = 'An error occurred';
    if (error.message) {
      if (/apiKey=/.test(error.message)) {
        errorMessage = 'An error occurred. Please try again later.';
      } else {
        errorMessage = error.message;
      }
    };
    return errorMessage;
  };
};
