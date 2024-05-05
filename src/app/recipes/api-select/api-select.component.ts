import { Component, Input, } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-api-select',
  templateUrl: './api-select.component.html',
  styleUrl: './api-select.component.css'
})
export class ApiSelectComponent {
  @Input() selected: Selected;

  constructor(private dataService: DataService) {};

  changeSelected(selectedValue) {
    const newSelected = {...this.selected, api: selectedValue}
    this.dataService.updateSelected(newSelected);
  };
};
