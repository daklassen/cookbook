import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeDTO } from './transfer/RecipeDTO';
import { Observable } from 'rxjs';
import { IngredientDTO } from './transfer/IngredientDTO';
import { environment } from '../../../environments/environment';
import { CategoryDTO } from './transfer/CategoryDTO';

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient) {}

  getUsersRecipes(filter: string): Observable<RecipeDTO[]> {
    let params = new HttpParams().set('filter', filter);
    return this.http.get<RecipeDTO[]>(environment.apiUrl + '/recipes', { params: params });
  }

  getRecipeById(id: number): Observable<RecipeDTO> {
    return this.http.get<RecipeDTO>(environment.apiUrl + '/recipes/' + id);
  }

  getAllCategories(): Observable<Array<CategoryDTO>> {
    return this.http.get<Array<CategoryDTO>>(environment.apiUrl + '/recipes/categories');
  }

  createRecipe(recipe: RecipeDTO): Observable<RecipeDTO> {
    return this.http.post<RecipeDTO>(environment.apiUrl + '/recipes', recipe);
  }

  updateRecipe(recipe: RecipeDTO, recipeId: number): Observable<RecipeDTO> {
    return this.http.put<RecipeDTO>(environment.apiUrl + '/recipes/' + recipeId, recipe);
  }

  parseUserInputIntoIngredient(input: string): IngredientDTO {
    let splittetInput = input.split('-');
    return {
      amount: parseInt(splittetInput[0].trim()),
      unit: splittetInput[1].trim(),
      name: splittetInput[2].trim()
    };
  }

  formatIngredientToString(ingredient: IngredientDTO): string {
    return ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name;
  }

  createEmptyRecipe(): RecipeDTO {
    // TODO:
    let recipe = {
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
      imageURL: ''
    };
    return recipe;
  }
}
