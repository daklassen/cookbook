import { UserDTO } from './UserDTO';
import { IngredientDTO } from './IngredientDTO';
import { ImageDTO } from './ImageDTO';

export interface RecipeDTO {
  id?: string;
  name: string;
  author?: UserDTO;
  imageUrl?: string;
  servings: number;
  description: string;
  categoryId: number;
  ingredients: Array<IngredientDTO>;
  imageFile: ImageDTO;
}

export class Recipe implements RecipeDTO {
  id?: string;
  name: string;
  author?: UserDTO;
  imageUrl?: string;
  servings: number;
  description: string;
  categoryId: number;
  ingredients: IngredientDTO[];
  imageFile: ImageDTO;

  constructor() {
    this.name = '';
    this.author = null;
    this.imageUrl = '';
    this.servings = null;
    this.description = '';
    this.categoryId = null;
    this.ingredients = [];
    this.imageFile = null;
  }
}
