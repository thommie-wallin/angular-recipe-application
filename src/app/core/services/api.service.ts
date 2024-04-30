import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Observable } from 'rxjs';
import { Options } from 'app/shared/interfaces';

@Injectable({
  providedIn: CoreModule,
})
export class ApiService {
  constructor(private httpClient: HttpClient) {};

  // Used to make a GET request to the API
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  };
};
