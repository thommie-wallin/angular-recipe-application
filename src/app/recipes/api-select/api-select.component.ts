import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { RecipeAPI } from 'app/shared/interfaces';
import { Observable } from 'rxjs';

type Selected = {
  mealType: string,
  allergene: string,
  diet: string,
  api: string,
}

@Component({
  selector: 'app-api-select',
  templateUrl: './api-select.component.html',
  styleUrl: './api-select.component.css'
})
export class ApiSelectComponent {
  // selected: RecipeAPI = { name: 'spoonacular' };

  selected;

  // @Output() messageEvent = new EventEmitter<string>();

  constructor(private dataService: DataService) {};

  ngOnInit() {
    this.dataService.getSelected().subscribe((selectedSubject) => {
      this.selected = selectedSubject;
    });
  };

  changeSelected(selectedValue) {
    const newSelected = {...this.selected, api: selectedValue}
    this.dataService.updateSelected(newSelected);
  };

  // Send selected value to parent
  // sendMessage(selected: string) {
  //   this.messageEvent.emit(selected)
  // };
};
