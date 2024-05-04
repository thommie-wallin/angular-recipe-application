import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Recipe } from 'app/shared/models/recipe.model';
import { RecipeAPI } from 'app/shared/interfaces';
import { CoreModule } from '../core.module';
import { DataService } from './data.service';

@Injectable({
  providedIn: CoreModule,
})
export class RecipesService {
  spoonacularBaseUrl: string = `https://api.spoonacular.com/recipes/`;
  private spoonacularApiKey: string = `${environment.spoonacularApiKey}`;

  constructor(private dataService: DataService, apiService: ApiService) {};

  // 

  // getRecipes(): Observable<Recipe> {
    

  //   if (apiSelect.name === 'spoonacular') {
      

  //     return this.apiService.get(url, { 
  //       params: new HttpParams()
  //       .append('apiKey',this.spoonacularApiKey) 
  //     });
  //     // this.dataService.getRecipesBySelected()
  //   } else {

  //   }

    
  // };
};
