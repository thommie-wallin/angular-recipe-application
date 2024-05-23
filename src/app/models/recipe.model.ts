export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredients[];
  instructions: string;
  instructionSteps: Instructions[];
  totalTime: number;
  servings: number;
  imageUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
}

interface Ingredients {
  name: string;
  quantity: number;
  unit: string;
}

interface Instructions {
  name: string;
  steps: string[];
}