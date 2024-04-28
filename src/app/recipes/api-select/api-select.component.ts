import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeAPI } from 'app/shared/interfaces';

@Component({
  selector: 'app-api-select',
  templateUrl: './api-select.component.html',
  styleUrl: './api-select.component.css'
})
export class ApiSelectComponent {
  selected: RecipeAPI = { name: 'spoonacular' };

  @Output() messageEvent = new EventEmitter<string>();

  // Send selected value to parent
  sendMessage(selected: string) {
    this.messageEvent.emit(selected)
  };
};
