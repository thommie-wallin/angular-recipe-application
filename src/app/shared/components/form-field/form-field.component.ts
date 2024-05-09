import { Component, Input, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'app/core/services/data.service';
import { FilterService } from 'app/core/services/filter.service';
import { Selected } from 'app/shared/interfaces';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() categoryName: string;
  @Input() label: string;
  @Input() selected: string;
  @Input() items: string[];
  @Input() apiSelected: string;

  control = input.required<FormControl>();

  constructor(private dataService: DataService, private filterService: FilterService) {};

  changeSelected(selectedValue) {
    // const newSelected = {...this.selected, [this.label]: selectedValue}
    // this.dataService.updateSelected(newSelected);
    // this.filterService.updateFilter({ [this.label]: selectedValue });
    // this.filterService.updateFilter(selectedValue);
    console.log(selectedValue);
    
  };
}
