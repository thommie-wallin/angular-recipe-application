import { TestBed } from '@angular/core/testing';

import { RecipeDisplayService } from './recipe-display.service';

describe('RecipeDisplayService', () => {
  let service: RecipeDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
