import { Component, Input, Output, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'app/core/services/data.service';
import { FilterService } from 'app/core/services/filter.service';
import { Selected } from 'app/shared/interfaces';
import { Category } from 'app/shared/models/category.model';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  // @Input() category!: Category<string>;
  @Input() categoryName: string;
  @Input() label: string;
  @Input() items: string[];
  selected: string;
  // @Input() apiSelected: string;

  // control = input.required<FormControl>();

  constructor(private dataService: DataService, private filterService: FilterService) {};

  // ngOnInit() {
  //   // Make first category option selected
  //   // this.selected = this.items[0];
  //   // console.log(this.items[0]);
    
  // };

  ngOnChanges() {
    this.selected = this.items[0];
  };

  changeSelected(selectedValue) {
    // const newSelected = {...this.selected, [this.label]: selectedValue}
    // this.dataService.updateSelected(newSelected);
    this.filterService.updateFilter({ [this.categoryName]: selectedValue });
    // this.filterService.updateFilter(selectedValue);
    // console.log(selectedValue);
    
  };
}
