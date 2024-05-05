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

  constructor(private apiService: ApiService) {};

  getSelectedRecipes(selectedCategories: Selected): Observable<Recipe> {
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

    };
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
