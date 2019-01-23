import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeDTO } from './transfer/RecipeDTO';
import { Observable } from 'rxjs';
import { IngredientDTO } from './transfer/IngredientDTO';
import { CategoryDTO } from './transfer/CategoryDTO';
import { INGREDIENT_REGEX } from 'src/app/recipe/elements/edit-recipe-form/edit-recipe-form.constants';

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient) {}

  createRecipe(recipe: RecipeDTO): Observable<RecipeDTO> {
    return this.http.post<RecipeDTO>('/recipes', recipe);
  }

  getUsersRecipes(filter: string): Observable<RecipeDTO[]> {
    const params = new HttpParams().set('filter', filter);
    return this.http.get<RecipeDTO[]>('/recipes', { params: params });
  }

  getRecipeById(id: number): Observable<RecipeDTO> {
    return this.http.get<RecipeDTO>('/recipes/' + id);
  }

  getAllCategories(): Observable<Array<CategoryDTO>> {
    return this.http.get<Array<CategoryDTO>>('/recipes/categories');
  }

  updateRecipe(recipe: RecipeDTO, recipeId: number): Observable<RecipeDTO> {
    return this.http.put<RecipeDTO>('/recipes/' + recipeId, recipe);
  }

  deleteRecipe(recipeId: number): Observable<Response> {
    return this.http.delete<Response>('/recipes/' + recipeId);
  }

  parseUserInputIntoIngredient(input: string): IngredientDTO {
    const match = input.match(INGREDIENT_REGEX);

    const amount = match[1];
    const unit = match[3] != null ? match[2] : ''; // no match means short notation without unit (e.g. 5 carrots)
    const name = match[3] != null ? match[3] : match[2];

    return {
      amount: parseInt(amount, 10),
      unit: unit,
      name: name
    };
  }

  formatIngredientToString(ingredient: IngredientDTO): string {
    return (ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name).replace('  ', ' ');
  }

  createEmptyRecipe(): RecipeDTO {
    // TODO:
    const recipe = {
      id: null,
      name: '',
      rating: null,
      servings: null,
      ingredients: [],
      author: {
        firstName: '',
        lastName: ''
      },
      description: '',
      categoryId: null,
      imageFile: null
    };
    return recipe;
  }
}
