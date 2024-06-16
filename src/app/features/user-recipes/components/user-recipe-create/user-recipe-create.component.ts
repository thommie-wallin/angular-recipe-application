import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-recipe-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-recipe-create.component.html',
  styleUrl: './user-recipe-create.component.css'
})
export class UserRecipeCreateComponent {
  recipeForm = new FormGroup({
    title: new FormControl(''),
    ingredients: new FormControl([]),
    instructions: new FormControl(''),
    totalTime: new FormControl(0),
    servings: new FormControl(0),
    description: new FormControl(''),
  });
}
