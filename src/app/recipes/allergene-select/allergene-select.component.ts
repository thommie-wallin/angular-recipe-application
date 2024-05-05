import { Component, Input } from '@angular/core';
import { DataService } from 'app/core/services/data.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-allergene-select',
  templateUrl: './allergene-select.component.html',
  styleUrls: ['./allergene-select.component.css']
})
export class AllergeneSelectComponent {
  @Input() selected: Selected;

  constructor(private dataService: DataService) {};

  changeSelected(selectedValue) {
    const newSelected = {...this.selected, allergene: selectedValue}
    this.dataService.updateSelected(newSelected);
  };
};
