import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from '../../../models/Ingredient';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/business/recipe.service';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.scss']
})
export class EditRecipeFormComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() submitButtonText: string;
  @Output() editedRecipe: EventEmitter<Recipe> = new EventEmitter();
  @Output() aborted: EventEmitter<Recipe> = new EventEmitter();

  recipeForm: FormGroup;
  items: FormArray;
  currentIngredient: string;
  categories: Array<Category>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.currentIngredient = '';
    this.initForm();    
    this.loadAllCategories();
  }

  ingredientToString(ingredient: Ingredient): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  onSubmit(formValue) {
    this.editedRecipe.emit(formValue);
  }

  onAbortClicked() {
    this.aborted.emit(this.recipe);
  }

  addIngredient(): void {
    const ingredient = this.recipeService.parseUserInputIntoIngredient(this.currentIngredient);
    this.addItem(ingredient);
    this.currentIngredient = '';
  }

  deleteIngredient(index: number): void {
    this.items = this.recipeForm.get('ingredients') as FormArray;
    this.items.removeAt(index);
  }

  private loadAllCategories(): void {
    this.recipeService.getAllCategories()
      .subscribe(
        categories => {
          this.categories = categories;
          this.fillForm();
        }
      );
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      'name': [null, Validators.required],
      'servings': [null, Validators.required],
      'category': [null, Validators.required],
      'ingredients': this.fb.array([], Validators.required),
      'description': [null, Validators.required],
    });
  }

  private fillForm(): void {
    let currentRecipe: Recipe = this.recipe;
    this.recipeForm.get('name').patchValue(currentRecipe.name);
    this.recipeForm.get('servings').patchValue(currentRecipe.servings);
    console.log(currentRecipe.category);
    this.recipeForm.get('category').patchValue(currentRecipe.category[0].id);
    currentRecipe.ingredients.map((ingredient) => this.addItem(ingredient));
    this.recipeForm.get('description').patchValue(currentRecipe.description);
  }

  private addItem(ingredient: Ingredient): void {
    this.items = this.recipeForm.get('ingredients') as FormArray;
    this.items.push(this.createItem(ingredient));
  }

  private createItem(ingredient: Ingredient): FormControl {
    return this.fb.control(ingredient);
  }

  get ingredientFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

}
