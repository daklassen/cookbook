import { Category } from './Category';
import { Author } from './author';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id?: number;
  name: string;
  servings: number;
  ingredients: Array<Ingredient>;
  author: Author;
  description: string;
  category: Category;
  imageURL: string;
}
