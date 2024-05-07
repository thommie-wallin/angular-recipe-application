import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Recipe } from 'app/shared/models/recipe.model';
import { CoreModule } from '../core.module';
import { Selected } from 'app/shared/interfaces';

@Injectable({
  providedIn: CoreModule,
})
export class RecipesService {
  private spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

  private edamamBaseUrl: string = `https://api.edamam.com/api/recipes/v2`;
  private edamamApiKey: string = `${environment.edamamApiKey}`;
  private edamamApiId: string = `${environment.edamamApiId}`;

  constructor(private apiService: ApiService) {};

  getSelectedRecipes(selectedCategories: Selected): Observable<any> {
    if (selectedCategories.api === 'spoonacular') {

      // Add selectedCategories to endpoint search
      let url: string = '';

      if (selectedCategories.allergene !== 'none') {
        url += `intolerances=${selectedCategories.allergene}&`
      }
      if (selectedCategories.mealType !== 'none') {
        url += `type=${selectedCategories.mealType}&`
      }
      if (selectedCategories.diet !== 'none') {
        url += `diet=${selectedCategories.diet}&`
      }

      if (url.length !== 0) {
        return this.apiService.get(`${this.spoonacularBaseUrl}complexSearch?${url}number=4&instructionsRequired=true`, { 
          params: new HttpParams()
          .append('apiKey',this.spoonacularApiKey) 
        });
      };
    } else if (selectedCategories.api === 'edamam') {
      // let url: string = '';

      // if (selectedCategories.allergene !== 'none') {
      //   url += `health=${selectedCategories.allergene}&`
      // }
      // if (selectedCategories.mealType !== 'none') {
      //   url += `dishType=${selectedCategories.mealType}&`
      // }
      // if (selectedCategories.diet !== 'none') {
      //   url += `health=${selectedCategories.diet}&`
      // }

      // if (url.length !== 0) {
      //   return this.apiService.get(`${this.edamamBaseUrl}?dishType=Desserts&`, { 
      //     params: new HttpParams()
      //     .append('app_key',this.edamamApiKey)
      //     .append('app_id', this.edamamApiId)
      //     .append('type', 'public')
      //   });
      // };

      return this.apiService.get(`${this.edamamBaseUrl}?${'dishType=Desserts&'}type=public`, { 
        params: new HttpParams()
        // .append('type', 'public')
        .append('app_id', this.edamamApiId)
        .append('app_key', this.edamamApiKey)
      })
      // .subscribe(data => {
      //   console.log(data);
        
      // })
    };
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
