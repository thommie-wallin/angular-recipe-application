import { Injectable, inject } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeApiInterface } from './recipe-api.interface';
import { Recipe } from 'app/shared/interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private baseUrl: string = `${environment.spoonacularBaseUrl}`;
  private apiKey: string = `${environment.spoonacularApiKey}`;

  getRecipesList(query: string): Observable<Recipe[]> {
    // Implement the API call
    return of([]);
  }

  getRecipeDetails(id: string): Observable<Recipe> {
    // Implement the API call
    return of(null);
  }

  // getRecipesList(filterCategories) {
  //   // console.log(filterCategories);

  //   // return of(filterCategories);

  //   // Add filterCategories to endpoint search
  //   let url: string = '';

  //   if (filterCategories.intolerances !== 'none') {
  //     url += `intolerances=${filterCategories.intolerances}&`
  //   }
  //   if (filterCategories.mealType !== 'none') {
  //     url += `type=${filterCategories.mealType}&`
  //   }
  //   if (filterCategories.diet !== 'none') {
  //     url += `diet=${filterCategories.diet}&`
  //   }

  //   // console.log(url);
    
  //   return this.apiService.get(`${this.spoonacularBaseUrl}complexSearch?${url}number=4&instructionsRequired=true`, { 
  //     params: new HttpParams()
  //     .append('apiKey',this.spoonacularApiKey) 
  //     // .append('number', 4)
  //     // .append('instructionsRequired', true)
  //   });

  //   // if (url.length !== 0) {
      
  //   // };
  // };
}
