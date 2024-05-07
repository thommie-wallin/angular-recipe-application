import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

// export interface FilterState {
//   articles: Article[];
//   filter: string | null;
//   error: string | null;
//   status: "loading" | "success" | "error";
//   currentPage: number;
// }

@Injectable({
  providedIn: CoreModule
})
export class FilterService {

  constructor() {};
}
