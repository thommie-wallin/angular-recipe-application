import { Component, OnInit, Input, input } from '@angular/core';
import { Ingredients, RecipeDetail } from 'app/models/recipe.model';
import { ExtendedIngredient } from 'app/shared/models/extendedingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  ingredients = input<Ingredients>();
  // @Input() recipe: ExtendedIngredient;
}
