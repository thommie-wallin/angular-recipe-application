import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule,
})
export class ApiService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {};

  getRecipesBySelection() {
    // return this.httpClient.get()
  };

  getRecipeById() {};
};
