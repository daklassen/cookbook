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
    this.loadAllCategories();
    this.initForm();
    this.fillForm();
  }

  ingredientToString(ingredient: Ingredient): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  onSubmit(formValue) {
    this.editedRecipe.emit(formValue);
  }

  onAbortClicked() {
    this.router.navigateByUrl('/recipes');
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
    let currentRecipe = this.recipe;
    this.recipeForm.get('name').patchValue(currentRecipe.name);
    // TODO: patch the rest
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
