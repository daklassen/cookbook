import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
export class EditRecipeFormComponent implements OnInit, OnDestroy {
  @Input()
  recipe: Recipe;
  @Input()
  submitButtonText: string;
  @Output()
  editedRecipe: EventEmitter<Recipe> = new EventEmitter();
  @Output()
  aborted: EventEmitter<Recipe> = new EventEmitter();

  public recipeForm: FormGroup;
  public items: FormArray;
  public currentIngredient: string;
  public categories: Array<Category>;
  public viewAlive: boolean = true;
  public servingOptions: any = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  public ngOnInit(): void {
    this.currentIngredient = '';
    this.initForm();
    this.loadAllCategories();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public ingredientToString(ingredient: Ingredient): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  public onSubmit(formValue) {
    this.editedRecipe.emit(formValue);
  }

  public onAbortClicked() {
    this.aborted.emit(this.recipe);
  }

  public addIngredient(): void {
    const ingredient = this.recipeService.parseUserInputIntoIngredient(this.currentIngredient);
    this.addItem(ingredient);
    this.currentIngredient = '';
  }

  public deleteIngredient(index: number): void {
    this.items = this.recipeForm.get('ingredients') as FormArray;
    this.items.removeAt(index);
  }

  private loadAllCategories(): void {
    this.recipeService
      .getAllCategories()
      .takeWhile(() => this.viewAlive)
      .subscribe(categories => {
        this.categories = categories;
        this.fillForm();
      });
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      servings: [null, Validators.required],
      category: [null, Validators.required],
      ingredients: this.fb.array([], Validators.required),
      description: [null, Validators.required]
    });
  }

  private fillForm(): void {
    let currentRecipe: Recipe = this.recipe;
    this.recipeForm.get('name').patchValue(currentRecipe.name);
    this.recipeForm.get('servings').patchValue(currentRecipe.servings);
    this.recipeForm.get('category').patchValue(currentRecipe.category.id);
    currentRecipe.ingredients.map(ingredient => this.addItem(ingredient));
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
