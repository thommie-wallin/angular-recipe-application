import { TestBed } from '@angular/core/testing';

import { SpoonacularService } from './spoonacular.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SpoonacularService', () => {
  let service: SpoonacularService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(SpoonacularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
