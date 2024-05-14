export class Category {
  key: string;
  label: string;
  // options: {key: string, value: string};
  // : string[];
  options: string[];

  constructor(
    key: string,
    label: string,
    // options: {key: string, value: string},
    options: string[],
  ) {
    this.key = key;
    this.label = label;
    this.options = options;
  };
};
