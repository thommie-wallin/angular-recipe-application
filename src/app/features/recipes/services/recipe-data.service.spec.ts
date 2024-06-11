import { TestBed } from '@angular/core/testing';

import { RecipeDataService } from './recipe-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RecipeDataService', () => {
  let service: RecipeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(RecipeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
