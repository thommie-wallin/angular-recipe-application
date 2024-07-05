import { TestBed } from '@angular/core/testing';

import { IngredientFilterService } from './ingredient-filter.service';

describe('IngredientFilterService', () => {
  let service: IngredientFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
