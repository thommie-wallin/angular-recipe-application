import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
