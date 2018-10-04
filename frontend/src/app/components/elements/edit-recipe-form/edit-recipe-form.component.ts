import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { IngredientDTO } from '../../../services/recipe/transfer/IngredientDTO';
import { RecipeDTO } from '../../../services/recipe/transfer/RecipeDTO';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { CategoryDTO } from '../../../services/recipe/transfer/CategoryDTO';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.scss']
})
export class EditRecipeFormComponent implements OnInit, OnDestroy {
  @Input()
  recipe: RecipeDTO;
  @Input()
  submitButtonText: string;
  @Output()
  editedRecipe: EventEmitter<RecipeDTO> = new EventEmitter();
  @Output()
  aborted: EventEmitter<RecipeDTO> = new EventEmitter();

  get ingredientFormArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get name(): FormControl {
    return this.recipeForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.recipeForm.get('description') as FormControl;
  }

  get currentIngredientValid(): boolean {
    const REGEX = /\d+\s*-+\s*.+\s*-+\s*.+/g;
    return REGEX.test(this.currentIngredient);
  }

  public recipeForm: FormGroup;
  public items: FormArray;
  public currentIngredient: string;
  public categories: Array<CategoryDTO>;
  public viewAlive: boolean = true;
  public servingOptions: any = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.currentIngredient = '';
    this.initForm();
    this.loadAllCategories();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public ingredientToString(ingredient: IngredientDTO): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  public onSubmit(formValue) {
    const recipe: RecipeDTO = {
      categoryId: formValue.category,
      description: formValue.description,
      ingredients: formValue.ingredients,
      name: formValue.name,
      servings: formValue.servings
    };
    this.editedRecipe.emit(recipe);
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
    let currentRecipe: RecipeDTO = this.recipe;
    this.recipeForm.get('name').patchValue(currentRecipe.name);
    this.recipeForm.get('servings').patchValue(currentRecipe.servings ? currentRecipe.servings : 4);
    this.recipeForm
      .get('category')
      .patchValue(currentRecipe.categoryId ? currentRecipe.categoryId : this.categories[0].id);
    currentRecipe.ingredients.map(ingredient => this.addItem(ingredient));
    this.recipeForm.get('description').patchValue(currentRecipe.description);
  }

  private addItem(ingredient: IngredientDTO): void {
    this.items = this.recipeForm.get('ingredients') as FormArray;
    this.items.push(this.createItem(ingredient));
  }

  private createItem(ingredient: IngredientDTO): FormControl {
    return this.fb.control(ingredient);
  }
}
