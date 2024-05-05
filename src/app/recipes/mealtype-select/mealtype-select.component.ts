import { Component, Input } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-mealtype-select',
  templateUrl: './mealtype-select.component.html',
  styleUrls: ['./mealtype-select.component.css']
})
export class MealtypeSelectComponent {
  @Input() selected: Selected;

  constructor(private dataService: DataService) {};

  changeSelected(selectedValue) {
    const newSelected = {...this.selected, mealType: selectedValue}
    this.dataService.updateSelected(newSelected);
  };
};
