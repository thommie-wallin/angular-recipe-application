export interface UserRecipe {
  id: string;
  title: string;
  ingredients: Ingredients[];
  instructions: string;
  totalTime: number;
  servings: number;
  description: string;
  imageUrl: string;
};

export interface Ingredients {
  name: string;
  quantity: number;
  unit: string;
}