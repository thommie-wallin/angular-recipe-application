import { Injectable, computed, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FilterService } from '../core/services/filter.service';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { Recipe, RecipeDataService } from 'app/features/recipes';

export interface RecipeState {
  recipeList: Recipe[];
  error: string | null;
  status: "loading" | "success" | "error";
};

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipeDataService = inject(RecipeDataService);
  private filterService = inject(FilterService);

  private state = signal<RecipeState>({
    recipeList: [],
    // recipeDetail: null,
    error: null,
    status: "loading",
  });

  // selectors
  recipeList = computed(() => this.state().recipeList);
  // recipeDetail = computed(() => this.state().recipeDetail);

  // sources
  error$ = new Subject();

  recipesForList$ = this.filterService.state$.pipe(
    switchMap(filterState => this.recipeDataService.getRecipesList(filterState)),
    retry(2),
    catchError(error => {
      this.error$.next(error)
      throw error;
    }),
  );

  apiChange$ = this.filterService.selectedApi$;

  constructor(
  ) {
    // reducers
    this.recipesForList$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeList: data,
        status: "success",
      }))
    );

    // Reset recipeList when switching recipe-api.
    this.apiChange$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeList: [],
        status: "loading",
      }))
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        status: "error",
        //? error: error.message,
      }))
    );
  };
};
