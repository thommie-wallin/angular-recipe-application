import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject, iif, of } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Recipe } from 'app/shared/models/recipe.model';
import { CoreModule } from '../core.module';
import { Selected } from 'app/shared/interfaces';
import { FilterService, FilterState } from './filter.service';
import { filter, retry, switchMap, tap } from 'rxjs/operators';
import { EDAMAM_KEY_NAME, SPOONACULAR_KEY_NAME } from 'app/shared/constants/ui';
import { SpoonacularService } from './api/spoonacular.service';

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
  private spoonacularService = inject(SpoonacularService)
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
  filter = computed(() => this.state().filter);

  private spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

  private edamamBaseUrl: string = `https://api.edamam.com/api/recipes/v2`;
  private edamamApiKey: string = `${environment.edamamApiKey}`;
  private edamamApiId: string = `${environment.edamamApiId}`;

  // filteredRecipes = computed(() => {
  //   const filter = this.filter();
  //   switch (filter.api) {
  //     case SPOONACULAR_KEY_NAME:
  //       this.spoonacularService.getRecipesList(filter)
  //     break;
  //     case EDAMAM_KEY_NAME:
      
  //     break;
  //     default:
  //       of(this.recipeList())
  //     break;
  //   }
    
  //   // console.log(filter);
    

  //   // return filter
  //   //   ? this.articles().filter((article) =>
  //   //       article.title.toLowerCase().includes(filter.toLowerCase())
  //   //     )
  //   //   : this.articles();
  // });

  // sources
  // currentApi$ = new Subject<string>();
  // currentApi$ = this.filterService.api();

  
  // ngOnInit() {
  //   // console.log(this.filterService.api);
  // }

  // recipesForList$ = this.filterService.state$.pipe(
    
  // )

  // api$ = this.filterService.api();

  // sources
  // retry$ = new Subject<void>();
  // error$ = new Subject<Error>();
  // currentPage$ = new Subject<number>();

  // recipesForList$ = this.filterService.state$.pipe(takeUntilDestroyed()).pipe((filterState) => {
  //   // Check if a value, other than the 'api'-property, changes from 'none'.
  //   const filterValuesArr = Object.values(filterState).splice(1).find((el) => el !== 'none');

  //   if (filterValuesArr !== undefined) {
  //     switch (filterState.api) {
  //       case SPOONACULAR_KEY_NAME:
  //         this.spoonacularService.getRecipesList(filter)
  //         // .subscribe(
  //         //   (res) => console.log(res)
            
  //         // );
  //         // this.state.update((state) => ({
  //         //   ...state,
  //         //   recipeList: recipe,
  //         // }))
  //         // categories = SPOONACULAR_FILTER_CATEGORIES;
  //         break;
  //       case EDAMAM_KEY_NAME:
  //         // categories = EDAMAM_FILTER_CATEGORIES;
  //         break;
  //       default:
  //         // categories = null;
  //         break;
  //     };
  //   }
  // })

  // recipesForList$ = this.filterService.state$.pipe(
  //   // tap(state => console.log(state))
  //   // switchMap(filterState => {
  //   //   //   switch (filterState.api) {
  //   //   //     case SPOONACULAR_KEY_NAME:
  //   //   //     this.spoonacularService.getRecipesList(filterState)
  //   //   //     break;
  //   //   //   case EDAMAM_KEY_NAME:
          
  //   //   //     break;
  //   //   //   default:
  //   //   //     of(this.recipeList())
  //   //   //     break;
  //   //   // }
  //   //   // }
  //   //   return of(filterState)
  //   // })
  //   // switchMap((filterState) => {
    
  //     // startWith(1),
  //     // switchMap(state => state.api

  //       // switch (state.api) {
  //       //   case SPOONACULAR_KEY_NAME:
  //       //     this.spoonacularService.getRecipesList(state).pipe(
              
  //       //     )
  //       //     break;
  //       //   case EDAMAM_KEY_NAME:
            
  //       //     break;
  //       //   default:
  //       //     of(this.recipeList())
  //       //     break;
  //       // }
  // )
  // .subscribe(res => console.log(res));

  // filter$ = this.filterService.state$;

  constructor(
    // private apiService: ApiService
  ) {
    this.filterService.state$.pipe(takeUntilDestroyed()).subscribe((filter) => {
        // Check if a value, other than the 'api'-property, changes from 'none'.
        const filterValuesArr = Object.values(filter).splice(1).find((el) => el !== 'none');

        if (filterValuesArr !== undefined) {
          switch (filter.api) {
            case SPOONACULAR_KEY_NAME:
              this.spoonacularService.getRecipesList(filter)
              // .subscribe(
              //   (res) => console.log(res)
                
              // );
              // this.state.update((state) => ({
              //   ...state,
              //   recipeList: recipe,
              // }))
              // categories = SPOONACULAR_FILTER_CATEGORIES;
              break;
            case EDAMAM_KEY_NAME:
              // categories = EDAMAM_FILTER_CATEGORIES;
              break;
            default:
              // categories = null;
              break;
          };
        }


        // if (valuesArr !== undefined) {
        //   this.state.update((state) => ({
        //     ...state,
        //     filter: filter,
        //   }))
        // } 
        // else {
        //   this.state.update((state) => ({
        //     ...state,
        //     filter: null,
        //   }))
        // };
        // console.log(filter)
      }
      
    );

    // reducers
    // this.recipesForList$.pipe(takeUntilDestroyed()).subscribe((recipes) =>
    //   console.log(recipes)
      
    //   // this.state.update((state) => ({
    //   //   ...state,
    //   //   recipes,
    //   //   status: "success",
    //   // }))
    // );

    // this.filterService.state$.pipe(takeUntilDestroyed()).subscribe((filter) => {
    //   // Check if a value, other than the 'api'-property, changes from 'none'.
    //   const filterValuesArr = Object.values(filter).splice(1).find((el) => el !== 'none');
    //   if (filterValuesArr !== undefined) {
    //     this.state.update((state) => ({
    //       ...state,
    //       filter: filter,
    //     }))
    //   } else {
    //     this.state.update((state) => ({
    //       ...state,
    //       filter: null,
    //     }))
    //   };
    //   console.log(filter)
    // });

    // this.retry$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() =>
    //     this.state.update((state) => ({ ...state, status: "loading" }))
    //   );

    // this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     status: "error",
    //     error: error.message,
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

  fetchRecipeList(filterState) {
    // Check if a value, other than the 'api'-property, changes from 'none'.
    const filterValuesArr = Object.values(filterState).splice(1).find((el) => el !== 'none');

    if (filterValuesArr !== undefined) {
      switch (filterState.api) {
        case SPOONACULAR_KEY_NAME:
          this.spoonacularService.getRecipesList(filterState)
          .subscribe((res) => console.log(res));
          //? Create a uniform interface way of presenting list of recipes. Then send them to recipe-list component.

          // this.state.update((state) => ({
          //   ...state,
          //   recipeList: recipe,
          // }))
          // categories = SPOONACULAR_FILTER_CATEGORIES;
          break;
        case EDAMAM_KEY_NAME:
          // categories = EDAMAM_FILTER_CATEGORIES;
          break;
        default:
          // categories = null;
          break;
      };
    }
  };

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
