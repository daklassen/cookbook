import { CategoryDTO } from './CategoryDTO';
import { UserDTO } from './UserDTO';
import { IngredientDTO } from './IngredientDTO';

export interface RecipeDTO {
  id?: number;
  name: string;
  author?: UserDTO;
  imageURL?: string;
  servings: number;
  description: string;
  categoryId: number;
  ingredients: Array<IngredientDTO>;
}
