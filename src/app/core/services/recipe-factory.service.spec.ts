import { TestBed } from '@angular/core/testing';

import { RecipeFactoryService } from '../features/recipes/services/recipe-factory.service';

describe('RecipeFactoryService', () => {
  let service: RecipeFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
