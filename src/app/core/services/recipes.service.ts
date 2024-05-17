import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Recipe } from 'app/shared/models/recipe.model';
import { CoreModule } from '../core.module';
import { Selected } from 'app/shared/interfaces';
import { FilterService, FilterState } from './filter.service';
import { retry, switchMap } from 'rxjs/operators';

export interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe;
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
    recipes: [],
    recipe: null,
    filter: null,
    error: null,
    status: "loading",
  });

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

  // fetchRecipesWithFilter = this.filterService.state$.pipe(
  //     // startWith(1),
  //     switchMap((page) =>
  //       this.currentApi$
        
        
  //       // this.apiService.getArticlesByPage(page).pipe(
  //       //   retry({
  //       //     // delay: (err) => {
  //       //     //   this.error$.next(err);
  //       //     //   return this.retry$;
  //       //     // },
  //       //   })
  //       // )
  //     )
  //   )

  // filter$ = this.filterService.state$;

  constructor(
    // private apiService: ApiService
  ) {
    this.filterService.state$.pipe(takeUntilDestroyed()).subscribe((filter) =>
      {console.log(filter)
      this.state.update((state) => ({
        ...state,
        filter: filter,
      }))}
    );

    // this.currentApi$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((currentPage) =>
    //     this.state.update((state) => ({
    //       ...state,
    //       currentPage,
    //       status: "loading",
    //       articles: [],
    //     }))
    //   );
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
