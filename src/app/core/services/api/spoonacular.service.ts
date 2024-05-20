import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiService = inject(ApiService);
  private spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

  constructor() { }

  getRecipesList(filterCategories) {
    // console.log(filterCategories);

    // return of(filterCategories);

    // Add filterCategories to endpoint search
    let url: string = '';

    if (filterCategories.intolerances !== 'none') {
      url += `intolerances=${filterCategories.intolerances}&`
    }
    if (filterCategories.mealType !== 'none') {
      url += `type=${filterCategories.mealType}&`
    }
    if (filterCategories.diet !== 'none') {
      url += `diet=${filterCategories.diet}&`
    }

    // console.log(url);
    
    return this.apiService.get(`${this.spoonacularBaseUrl}complexSearch?${url}number=4&instructionsRequired=true`, { 
      params: new HttpParams()
      .append('apiKey',this.spoonacularApiKey) 
      // .append('number', 4)
      // .append('instructionsRequired', true)
    });

    // if (url.length !== 0) {
      
    // };
  };
}
