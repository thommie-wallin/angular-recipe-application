import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mealtype-select',
  templateUrl: './mealtype-select.component.html',
  styleUrls: ['./mealtype-select.component.css']
})
export class MealtypeSelectComponent {
  selected: string = 'None';

  @Output() messageEvent = new EventEmitter<string>();

  // Send selected value to parent
  sendMessage(selected: string) {
    this.messageEvent.emit(selected)
  };
};
