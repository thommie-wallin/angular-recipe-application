import { TestBed } from '@angular/core/testing';
import { RecipeFactoryService } from './recipe-factory.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RecipeFactoryService', () => {
  let service: RecipeFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    service = TestBed.inject(RecipeFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
