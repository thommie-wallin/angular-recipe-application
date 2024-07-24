import { TestBed } from '@angular/core/testing';

import { IngredientFilterService } from './ingredient-filter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('IngredientFilterService', () => {
  let service: IngredientFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    service = TestBed.inject(IngredientFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
