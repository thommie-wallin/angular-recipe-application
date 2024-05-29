import { TestBed } from '@angular/core/testing';

import { FavouriteStateService } from './favourite-state.service';

describe('FavouritesService', () => {
  let service: FavouriteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
