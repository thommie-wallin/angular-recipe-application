export interface FilterCategory {
  key: string;
  label: string;
  options: string[];
}

export interface FilterState {
  [index: string]: string;
}