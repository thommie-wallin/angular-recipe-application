import { Injectable, computed, inject, signal } from '@angular/core';
import { FilterState, SPOONACULAR_KEY_NAME } from '../../../core';
import { toObservable } from '@angular/core/rxjs-interop';
import { IngredientDataService } from './ingredient-data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientFilterService {
  private ingredientDataService = inject(IngredientDataService);
  // private state = signal<FilterState>({});
  private selectedApi = signal<string>(SPOONACULAR_KEY_NAME);

  api = computed(() => this.selectedApi());

  // Observables
  // state$ = toObservable(this.state);
  // selectedApi$ = toObservable(this.selectedApi);
  // debouncedIngredientSearch$: Observable<string | null> = of('');

  constructor() {
    this.changeSelectedApi(SPOONACULAR_KEY_NAME );
  };

  changeSelectedApi(selected: string) {
    // Change selected API in data service.
    this.ingredientDataService.switchApi(selected);
    this.selectedApi.set(selected);
  };

  // updateFilter(searchTerm: FilterState) {
  //   // const api = selected['api'];
    

  //   // this.state.set(searchTerm);

    
  //   // if ('api' in selected) {
      
  //   // } else {
  //   //   // this.state.update((state) => ({
  //   //   //   ...state,
  //   //   //   ...selected,
  //   //   // }));
  //   // }
  // };

  // setupDebouncedSearchObservable() {
  //   this.debouncedIngredientSearch$ = this.ingredientForm.get('name')!.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     // Filter out null or undefined values preventing errors and redundant API requests.
  //     filter((name: string | null) => name !== null && name !== undefined)
  //   );
  // };
};
