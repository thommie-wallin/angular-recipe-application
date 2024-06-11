import { TestBed } from '@angular/core/testing';

import { EdamamService } from './edamam.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EdamamService', () => {
  let service: EdamamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(EdamamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
