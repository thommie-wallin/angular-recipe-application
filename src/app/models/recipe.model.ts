export interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
};

export interface RecipeDetail {
  id: number;
  title: string;
  ingredients: Ingredients[];
  instructions: string;
  totalTime: number;
  servings: number;
  imageUrl: string;
}

interface Ingredients {
  name: string;
  quantity: number;
  unit: string;
}