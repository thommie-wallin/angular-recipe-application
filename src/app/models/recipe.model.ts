export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  instructionSteps: string[];
  totalTime: number;
  servings: number;
  imageUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
}
