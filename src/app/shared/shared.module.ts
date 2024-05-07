import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
  declarations: [
    FormFieldComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
  ],
  exports: [
    FormFieldComponent
  ],
})
export class SharedModule { }
