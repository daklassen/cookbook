import { UserDTO } from './UserDTO';
import { IngredientDTO } from './IngredientDTO';
import { ImageDTO } from './ImageDTO';

export interface RecipeDTO {
  id?: number;
  name: string;
  author?: UserDTO;
  imageURL?: string;
  servings: number;
  description: string;
  categoryId: number;
  ingredients: Array<IngredientDTO>;
  imageFile: ImageDTO;
}
