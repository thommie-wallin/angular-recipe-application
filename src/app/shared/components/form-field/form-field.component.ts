import { Component, Input, inject } from '@angular/core';
import { FilterService } from 'app/core/services/filter.service';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  private filterService = inject(FilterService);
  @Input() categoryName: string;
  @Input() label: string;
  @Input() items: string[];
  selected: string;

  ngOnChanges() {
    this.selected = this.items[0];
  };

  changeSelected(selectedValue) {
    this.filterService.updateFilter({ [this.categoryName]: selectedValue });
  };
}
