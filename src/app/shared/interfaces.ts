import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Tile {
  cols: number;
  rows: number;
}

export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length: Length;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface Us {
  amount: number;  
  unitLong: string;
  unitShort: string;
}

export interface Metric {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface WinePairing {
}

// Default type for HttpCLient options
export interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;
};

export interface Selected {
  mealType: string,
  allergene: string,
  diet: string,
  api: string,
};