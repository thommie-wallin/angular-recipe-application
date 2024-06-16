import { TestBed } from '@angular/core/testing';

import { UserRecipesStateService } from './user-recipes-state.service';

describe('UserRecipesStateService', () => {
  let service: UserRecipesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRecipesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
