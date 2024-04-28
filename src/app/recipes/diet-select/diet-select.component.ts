import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-diet-select',
  templateUrl: './diet-select.component.html',
  styleUrls: ['./diet-select.component.css']
})
export class DietSelectComponent {
  selected: string = 'None';

  @Output() messageEvent = new EventEmitter<string>();

  // Send selected value to parent
  sendMessage(selected: string) {
    this.messageEvent.emit(selected)
  };
};
