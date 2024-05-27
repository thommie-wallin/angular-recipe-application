import { Component, Input } from '@angular/core';
import { Ingredients } from 'app/models/recipe.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  @Input() ingredients: Ingredients[];
}
