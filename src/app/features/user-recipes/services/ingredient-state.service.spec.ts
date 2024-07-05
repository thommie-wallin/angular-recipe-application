import { TestBed } from '@angular/core/testing';

import { IngredientStateService } from './ingredient-state.service';

describe('IngredientStateService', () => {
  let service: IngredientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
