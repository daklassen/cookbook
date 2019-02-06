import { Injectable } from '@angular/core';
import { RecipeDTO } from './transfer/RecipeDTO';
import { Observable, of, from } from 'rxjs';
import { IngredientDTO } from './transfer/IngredientDTO';
import { CategoryDTO } from './transfer/CategoryDTO';
import { INGREDIENT_REGEX } from 'src/app/recipe/elements/edit-recipe-form/edit-recipe-form.constants';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take, map, filter } from 'rxjs/operators';
import { UserDTO } from './transfer/UserDTO';

@Injectable()
export class RecipeService {
  private currentUser: UserDTO;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = {
          id: user.uid,
          name: user.displayName
        };
      }
    });
  }

  createRecipe(recipe: RecipeDTO): Observable<DocumentReference> {
    const recipeNew: RecipeDTO = { ...recipe, author: this.currentUser };
    return from(this.db.collection<RecipeDTO>('recipes').add(recipeNew)).pipe(take(1));
  }

  getUsersRecipes(filterText: string): Observable<RecipeDTO[]> {
    if (!this.currentUser) return;
    return this.db
      .collection<RecipeDTO>('recipes', ref => ref.where('author.id', '==', this.currentUser.id))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data } as RecipeDTO;
          })
        ),
        map((recipes: RecipeDTO[]) => {
          const filteredRecipes = recipes.filter(recipe => {
            if (!filterText) return true;
            return this.recipePassesFilter(recipe, filterText);
          });
          return filteredRecipes;
        })
      );
  }

  getRecipeById(id: string): Observable<RecipeDTO> {
    if (!this.currentUser) return;
    return this.db.doc<RecipeDTO>(`recipes/${id}`).valueChanges();
  }

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.db
      .collection<CategoryDTO>('categories')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data } as CategoryDTO;
          })
        )
      );
  }

  updateRecipe(recipe: RecipeDTO, recipeId: string): Promise<void> {
    if (!this.currentUser) return;
    return this.db.doc<RecipeDTO>(`recipes/${recipeId}`).update(recipe);
  }

  deleteRecipe(recipeId: string): Promise<void> {
    return this.db.doc<RecipeDTO>(`recipes/${recipeId}`).delete();
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

  private recipePassesFilter(recipe: RecipeDTO, filterText: string): boolean {
    return (
      recipe.name.includes(filterText) ||
      recipe.author.name.includes(filterText) ||
      recipe.ingredients.reduce((sum, ingr) => sum || ingr.name.includes(filterText), false) ||
      recipe.id.toString().includes(filterText)
    );
  }
}
