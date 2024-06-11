import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { API_FORM_FIELD, FilterService } from '../../../core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  private filterService = inject(FilterService);

  @Input() categoryName: string = '';
  @Input() label: string = '';
  @Input() items: string[] = [];
  selected: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryName'] || changes['items']) {
      if (this.categoryName === API_FORM_FIELD.name) {
        this.selected = this.filterService.api();
      } else {
        this.selected = this.items[0];
      };
    };
  };

  changeSelected(selectedValue: string) {
    this.filterService.updateFilter({ [this.categoryName]: selectedValue });
  };
}
