import { TestBed } from '@angular/core/testing';

import { IngredientStateService } from './ingredient-state.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('IngredientStateService', () => {
  let service: IngredientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    service = TestBed.inject(IngredientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
