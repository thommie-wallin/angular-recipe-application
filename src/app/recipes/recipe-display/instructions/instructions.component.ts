import { Component, OnInit, Input, input } from '@angular/core';
import { RecipeDetail } from 'app/models/recipe.model';
import { Step } from 'app/shared/interfaces';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  recipeDetail = input<RecipeDetail>();
  // @Input() recipe: Step;
  
  // constructor() { }

  // ngOnInit(): void {
  // }
}
