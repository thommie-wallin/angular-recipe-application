import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RecipeDataService, RecipeDetail } from 'app/features/recipes';
import { switchMap } from 'rxjs/operators';

export interface RecipeDetailState {
  recipeDetail: RecipeDetail;
  recipeId: string;
  error: string | null;
  status: "loading" | "success" | "error";
};

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailService {
  private recipeDataService = inject(RecipeDataService);

  private state = signal<RecipeDetailState>({
    recipeDetail: null,
    recipeId: '',
    error: null,
    status: "loading",
  });

  // selectors
  recipeDetail = computed(() => this.state().recipeDetail);
  recipeId = computed(() => this.state().recipeId);

  // Retrieve the recipe detail from the API.
  private recipeDetail$ = toObservable(this.recipeId).pipe(
    switchMap(recipeId => this.recipeDataService.getRecipeDetails(recipeId))
  );

  constructor() {
    // reducers
    this.recipeDetail$.pipe(takeUntilDestroyed()).subscribe((data) =>
      this.state.update((state) => ({
        ...state,
        recipeDetail: data,
        status: "success",
      }))
    );
  };

  setRecipeId(id: string) {
    this.state.update((state) => ({
      ...state,
      recipeId: id,
    }))
  };
}
