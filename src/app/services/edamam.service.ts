import { Injectable, inject } from '@angular/core';
import { RecipeApiInterface } from './recipe-api.interface';
import { Observable, of } from 'rxjs';
import { Recipe } from 'app/shared/interfaces/recipe.interface';
import { environment } from 'environments/environment';
import { ApiService } from 'app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EdamamService implements RecipeApiInterface {
  private apiService = inject(ApiService);
  private baseUrl: string = `${environment.edamamBaseUrl}`;
  private apiKey: string = `${environment.edamamApiKey}`;
  private apiId: string = `${environment.edamamApiId}`;

  getRecipesList(query: string): Observable<Recipe[]> {
    // Implement the API call
    return of([]);
  }

  getRecipeDetails(id: string): Observable<Recipe> {
    // Implement the API call
    return of(null);
  }
}
