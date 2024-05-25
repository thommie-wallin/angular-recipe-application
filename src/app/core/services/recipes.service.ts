import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CoreModule } from '../core.module';
import { Selected } from 'app/shared/interfaces';
import { FilterService } from './filter.service';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { RecipeDataService } from 'app/services/recipe-data.service';
import { Recipe, RecipeDetail } from 'app/models/recipe.model';

export interface RecipeState {
  recipeList: Recipe[];
  recipeDetail: RecipeDetail;
  error: string | null;
  status: "loading" | "success" | "error";
};

@Injectable({
  providedIn: CoreModule,
})
export class RecipesService {
  private recipeDataService = inject(RecipeDataService);
  private apiService = inject(ApiService);
  private filterService = inject(FilterService);

  private state = signal<RecipeState>({
    recipeList: [],
    recipeDetail: null,
    error: null,
    status: "loading",
  });

  // selectors
  recipeList = computed(() => this.state().recipeList);
  recipeDetail = computed(() => this.state().recipeDetail);

  private spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

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

  // getOneRecipe(id: number, selectedCategories: Selected) : Observable<Recipe> {
  //   if (selectedCategories.api === 'spoonacular') {
  //     return this.apiService.get(
  //       `${this.spoonacularBaseUrl}${id}/information`, { 
  //         params: new HttpParams()
  //         .append('apiKey',this.spoonacularApiKey) 
  //       }
  //     );
  //   } else if (selectedCategories.api === 'edamam') {

  //   };
  // };
};
