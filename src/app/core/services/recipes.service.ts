import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Recipe } from 'app/shared/models/recipe.model';
import { CoreModule } from '../core.module';
import { Selected } from 'app/shared/interfaces';
import { FilterService, FilterState } from './filter.service';
import { retry, switchMap } from 'rxjs/operators';

export interface RecipeState {
  recipeList: Recipe[];
  recipeDetail: Recipe;
  filter: FilterState;
  error: string | null;
  status: "loading" | "success" | "error";
};

@Injectable({
  providedIn: CoreModule,
})
export class RecipesService {
  private apiService = inject(ApiService);
  private filterService = inject(FilterService);

  private state = signal<RecipeState>({
    recipeList: [],
    recipeDetail: null,
    filter: null,
    error: null,
    status: "loading",
  });

  // selectors
  recipeList = computed(() => this.state().recipeList);
  recipeDetail = computed(() => this.state().recipeDetail);

  private spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

  private edamamBaseUrl: string = `https://api.edamam.com/api/recipes/v2`;
  private edamamApiKey: string = `${environment.edamamApiKey}`;
  private edamamApiId: string = `${environment.edamamApiId}`;

  // sources
  // currentApi$ = new Subject<string>();
  // currentApi$ = this.filterService.api();

  ngOnInit() {
    // console.log(this.filterService.api);
    
    
  }

  // recipesForList$ = this.filterService.state$.pipe(
    
  // )

  // filter$ = this.filterService.state$;

  recipesForList$ = this.filterService.state$.pipe(
    // startWith(1),
    switchMap((page) => of(page)
      
      // this.apiService.getArticlesByPage(page).pipe(
      //   retry({
      //     delay: (err) => {
      //       this.error$.next(err);
      //       return this.retry$;
      //     },
      //   })
      // )
    )
  )
  // .subscribe(res => console.log(res));

  constructor(
    // private apiService: ApiService
  ) {
    // this.filterService.state$.pipe(takeUntilDestroyed()).subscribe((filter) => {
    //     const valuesArr = Object.values(filter).splice(1).find((el) => el !== 'none');

    //     if (valuesArr !== undefined) {
    //       this.state.update((state) => ({
    //         ...state,
    //         filter: filter,
    //       }))
    //     } else {
    //       this.state.update((state) => ({
    //         ...state,
    //         filter: null,
    //       }))
    //     };
    //     // console.log(this.state())
    //   }
      
    // );

    // reducers
    // this.recipesForList$.pipe(takeUntilDestroyed()).subscribe((recipes) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     recipes,
    //     status: "success",
    //   }))
    // );
  };

  getSelectedRecipes(selectedCategories: Selected) {
    // console.log(this.currentApi$);

    // if (selectedCategories.api === 'spoonacular') {

    //   // Add selectedCategories to endpoint search
    //   let url: string = '';

    //   if (selectedCategories.allergene !== 'none') {
    //     url += `intolerances=${selectedCategories.allergene}&`
    //   }
    //   if (selectedCategories.mealType !== 'none') {
    //     url += `type=${selectedCategories.mealType}&`
    //   }
    //   if (selectedCategories.diet !== 'none') {
    //     url += `diet=${selectedCategories.diet}&`
    //   }

    //   if (url.length !== 0) {
    //     return this.apiService.get(`${this.spoonacularBaseUrl}complexSearch?${url}number=4&instructionsRequired=true`, { 
    //       params: new HttpParams()
    //       .append('apiKey',this.spoonacularApiKey) 
    //     });
    //   };
    // } else if (selectedCategories.api === 'edamam') {
    //   // let url: string = '';

    //   // if (selectedCategories.allergene !== 'none') {
    //   //   url += `health=${selectedCategories.allergene}&`
    //   // }
    //   // if (selectedCategories.mealType !== 'none') {
    //   //   url += `dishType=${selectedCategories.mealType}&`
    //   // }
    //   // if (selectedCategories.diet !== 'none') {
    //   //   url += `health=${selectedCategories.diet}&`
    //   // }

    //   // if (url.length !== 0) {
    //   //   return this.apiService.get(`${this.edamamBaseUrl}?dishType=Desserts&`, { 
    //   //     params: new HttpParams()
    //   //     .append('app_key',this.edamamApiKey)
    //   //     .append('app_id', this.edamamApiId)
    //   //     .append('type', 'public')
    //   //   });
    //   // };

    //   return this.apiService.get(`${this.edamamBaseUrl}?${'dishType=Desserts&'}type=public`, { 
    //     params: new HttpParams()
    //     // .append('type', 'public')
    //     .append('app_id', this.edamamApiId)
    //     .append('app_key', this.edamamApiKey)
    //   })
    //   // .subscribe(data => {
    //   //   console.log(data);
        
    //   // })
    // };
  };

  // testEdamam() {
  //   return this.apiService.get(`${this.edamamBaseUrl}?dishType=Desserts&`, { 
  //       params: new HttpParams()
  //       .append('app_key',this.edamamApiKey)
  //       .append('app_id', this.edamamApiId)
  //       .append('type', 'public')
  //     });
  // }

  getOneRecipe(id: number, selectedCategories: Selected) : Observable<Recipe> {
    if (selectedCategories.api === 'spoonacular') {
      return this.apiService.get(
        `${this.spoonacularBaseUrl}${id}/information`, { 
          params: new HttpParams()
          .append('apiKey',this.spoonacularApiKey) 
        }
      );
    } else if (selectedCategories.api === 'edamam') {

    };
  };
};
