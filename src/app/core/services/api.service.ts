import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class ApiService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {};
}
