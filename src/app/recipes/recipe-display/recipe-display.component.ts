import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Recipe } from 'app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent {
  recipeId;
  recipe$: Observable<Recipe>;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.dataService.getRecipe(this.recipeId);
  }
}
