import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../../models/Recipe';
import { Observable } from 'rxjs';
import { Ingredient } from '../../models/Ingredient';
import { Category } from '../../models/Category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getUsersRecipes(filter: string): Observable<Recipe[]> {
    let params = new HttpParams().set('filter', filter);
    return this.http.get<Recipe[]>(environment.apiUrl + '/recipes', { params: params });
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(environment.apiUrl + '/recipes/' + id);
  }

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.apiUrl + '/recipes/categories');
  }

  createRecipe(formValue: any): Observable<Recipe> {
    return this.http.post<Recipe>(environment.apiUrl + '/recipes', formValue);
  }

  updateRecipe(formValue: any, recipeId: number): Observable<Recipe> {
    return this.http.put<Recipe>(environment.apiUrl + '/recipes/' + recipeId, formValue);
  }

  parseUserInputIntoIngredient(input: string): Ingredient {
    let splittetInput = input.split('-');
    return {
      amount: parseInt(splittetInput[0].trim()),
      unit: splittetInput[1].trim(),
      name: splittetInput[2].trim()
    };
  }

  formatIngredientToString(ingredient: Ingredient): string {
    return ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name;
  }

  createEmptyRecipe(): Recipe {
    let recipe = {
      id: null,
      name: '',
      rating: null,
      servings: null,
      ingredients: [],
      author: {
        id: null,
        email: '',
        firstName: '',
        lastName: '',
        keycloakUserId: ''
      },
      description: '',
      category: null,
      imageURL: ''
    };
    return recipe;
  }
}
