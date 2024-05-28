import { Component, Input } from '@angular/core';
import { RecipeDetail } from 'app/features/recipes/models/recipe.model';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  @Input() recipeDetail: RecipeDetail;
}
