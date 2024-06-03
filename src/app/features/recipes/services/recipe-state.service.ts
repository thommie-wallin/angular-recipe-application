import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { FilterService } from '../../../core/services/filter.service';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { RecipeDataService } from './recipe-data.service';
import { Recipe, RecipeDetail } from '../models/recipe.model';
import { EMPTY } from 'rxjs';



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

  private state = signal<RecipeState>({
    recipeList: [],
    recipeDetail: null,
    recipeId: null,
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
      // this.error$.next(error)
      throw error;
    }),
  );

  private recipeDetail$ = toObservable(this.recipeId).pipe(
    switchMap(recipeId => {
      // If recipeId-state is null return empty observable.
      if (!recipeId) {
        return EMPTY;
      };
      return this.recipeDataService.getRecipeDetails(recipeId);
    }),
  );

  private apiChange$ = this.filterService.selectedApi$;

  constructor(
  ) {
    // console.log(mockRecipeList);
    
    // this.state.update((state) => ({
    //   ...state,
    //   // recipeList: data,
    //   recipeList: mockRecipeList,
    //   // status: "success",
    // }))

    // this.state().set(mockRecipeList)


    // reducers
    this.recipesForList$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeList: data,
        // recipeList: mockRecipeList,
        // status: "success",
      }))
    );

    // Reset recipeList when switching recipe-api.
    this.apiChange$.pipe(takeUntilDestroyed()).subscribe(() =>
      this.state.update((state) => ({
        ...state,
        recipeList: [],
        // status: "loading",
      }))
    );

    this.recipeDetail$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeDetail: data,
        // status: "success",
      }))
    );
  };

  setRecipeId(id: string) {
    this.state.update((state) => ({
      ...state,
      recipeId: id,
    }))
  };
};
