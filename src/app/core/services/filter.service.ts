import { Injectable, signal } from '@angular/core';
import { CoreModule } from '../core.module';
import { FormControl } from '@angular/forms';

export interface FilterState {
  api: string,
  mealType: string,
  diet: string,
  allergene: string,
};

@Injectable({
  providedIn: CoreModule
})
export class FilterService {
  private state = signal<FilterState>({
    api: 'spoonacular',
    mealType: 'none', 
    diet: 'none',
    allergene: 'none',
  });

  updateFilter(selected: object) {
    this.state.update((state) => ({
      ...state,
      selected
    }))
    console.log(this.state());
    
  };
}
