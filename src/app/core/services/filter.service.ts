import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CoreModule } from '../core.module';
import { FormControl } from '@angular/forms';

export interface FilterState {
  api: string,
  mealType: string,
  diet: string,
  allergene: string,
  filter: string | null,
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
    filter: null,
  });

  filterControl = new FormControl();
  filter$ = this.filterControl.valueChanges;

  filter = computed(() => this.state().filter);

  constructor() {
    this.filter$.pipe(takeUntilDestroyed()).subscribe((filter) =>
      console.log(filter)
      
      // this.state.update((state) => ({
      //   ...state,
      //   filter: filter === "" ? null : filter,
      // }))
    );
  };

  updateFilter(selected) {
    this.state.update((state) => ({
      ...state,
      mealType: 'test',
    }))
    console.log(this.state());
    
  };
}
