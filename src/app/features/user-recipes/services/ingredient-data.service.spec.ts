import { TestBed } from '@angular/core/testing';

import { IngredientDataService } from './ingredient-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('IngredientDataService', () => {
  let service: IngredientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    service = TestBed.inject(IngredientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
