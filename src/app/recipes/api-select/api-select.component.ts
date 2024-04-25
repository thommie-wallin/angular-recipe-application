import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-api-select',
  templateUrl: './api-select.component.html',
  styleUrl: './api-select.component.css'
})
export class ApiSelectComponent {
  selected: string = 'None';

  @Output() messageEvent = new EventEmitter<string>();

  constructor() {};

  // Send selected value to parent
  sendMessage(selected) {
    this.messageEvent.emit(this.selected)
  }
}
