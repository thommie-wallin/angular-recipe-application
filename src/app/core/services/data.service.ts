import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { environment } from 'environments/environment';
import { Recipe } from '../../shared/models/recipe.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: CoreModule,
})
export class DataService {
  private apiKey: string = `${environment.spoonacularApiKey}`;
  baseUrl: string = `https://api.spoonacular.com/recipes/`;

  constructor(private http: HttpClient, private apiService: ApiService) {};

  getRecipesBySelected(mealType: string, allergene: string, diet: string) : Observable<Recipe> {
    // If mealtype not empty string
    let url: string = '';

    if (allergene) {
      url += `intolerances=${allergene}&`
    }
    if (mealType) {
      url += `type=${mealType}&`
    }
    if (diet) {
      url += `diet=${diet}&`
    }

    return this.apiService.get(
      `${this.baseUrl}complexSearch?${url}number=4&instructionsRequired=true`, { 
        params: new HttpParams()
        .append('apiKey',this.apiKey) 
      }
    );

    // return this.http.get<any>(`${this.baseUrl}complexSearch?${url}number=4&instructionsRequired=true`, {
    //   params: new HttpParams()
    //   .append('apiKey', this.apiKey)
    // })
  };

  getRecipe(id: number) : Observable<Recipe> {
    return this.apiService.get(
      `${this.baseUrl}${id}/information`, { 
        params: new HttpParams()
        .append('apiKey',this.apiKey) 
      }
    );

    // return this.http.get<Recipe>(`${this.baseUrl}${id}/information`, {
    //   params: new HttpParams()
    //   .append('apiKey', this.apiKey)
    // })
  };
};
