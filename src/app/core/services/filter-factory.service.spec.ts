import { TestBed } from '@angular/core/testing';

import { FilterFactoryService } from './filter-factory.service';

describe('FilterFactoryService', () => {
  let service: FilterFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
