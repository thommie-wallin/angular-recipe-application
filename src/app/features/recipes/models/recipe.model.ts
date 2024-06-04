export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  api: string;
};

export interface RecipeDetail {
  id: string;
  title: string;
  ingredients: Ingredients[];
  instructions: string;
  totalTime: number;
  servings: number;
  imageUrl: string;
}

export interface Ingredients {
  name: string;
  quantity: number;
  unit: string;
}