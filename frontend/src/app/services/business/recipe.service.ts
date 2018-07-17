import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../models/Recipe';
import { Observable } from 'rxjs';
import { Ingredient } from '../../models/Ingredient';
import { Category } from '../../models/Category';

const BASE_URL: string = 'http://localhost:9000';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getUsersRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(BASE_URL + "/recipes");
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(BASE_URL + "/recipes/" + id);
  }

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(BASE_URL + "/recipes/categories");
  }

  createRecipe(formValue: any): Observable<Recipe> {
    return this.http.post<Recipe>(BASE_URL + "/recipes", formValue);
  }

  updateRecipe(formValue: any, recipeId: number): Observable<Recipe> {
    return this.http.put<Recipe>(BASE_URL + "/recipes/" + recipeId, formValue);
  }

  parseUserInputIntoIngredient(input: string): Ingredient {
    let splittetInput = input.split(" - ");
    return { 
      amount: parseInt(splittetInput[0]),
      unit: splittetInput[1],
      name: splittetInput[2] 
    }
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
        keycloakUserId: '',
      },
      description: '',
      category: [],
      imageURL: '',
    }
    return recipe;
  }
}
