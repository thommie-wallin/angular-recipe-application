import { Component, Input } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-diet-select',
  templateUrl: './diet-select.component.html',
  styleUrls: ['./diet-select.component.css']
})
export class DietSelectComponent {
  @Input() selected: Selected;

  constructor(private dataService: DataService) {};

  changeSelected(selectedValue) {
    const newSelected = {...this.selected, diet: selectedValue}
    this.dataService.updateSelected(newSelected);
  };
};
