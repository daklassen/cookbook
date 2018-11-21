import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { CategoryDTO } from 'src/app/shared/services/recipe/transfer/CategoryDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { IngredientDTO } from 'src/app/shared/services/recipe/transfer/IngredientDTO';
import { ImageDTO } from 'src/app/shared/services/recipe/transfer/ImageDTO';

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

  get imageFile(): FormControl {
    return this.recipeForm.get('imageFile') as FormControl;
  }

  get currentIngredientValid(): boolean {
    const REGEX = /\d+\s* +\s*.+\s* +\s*.+/g;
    return REGEX.test(this.currentIngredient);
  }

  public recipeForm: FormGroup;
  public items: FormArray;
  public currentIngredient: string;
  public currentImageFileName: string;
  public categories: Array<CategoryDTO>;
  public viewAlive: boolean = true;
  public servingOptions: any = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private imageService: ImageService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.currentIngredient = '';
    this.currentImageFileName = '';
    this.initForm();
    this.loadAllCategories();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public ingredientToString(ingredient: IngredientDTO): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  public onSubmit(formValue): void {
    const recipe: RecipeDTO = {
      categoryId: formValue.category,
      description: formValue.description,
      ingredients: formValue.ingredients,
      name: formValue.name,
      servings: formValue.servings,
      imageFile: formValue.imageFile
    };
    this.editedRecipe.emit(recipe);
  }

  public onAbortClicked() {
    this.aborted.emit(this.recipe);
  }

  public onFileChange(event): void {
    if (event.target.files) {
      const [file] = event.target.files;
      this.spinner.show();
      this.imageService
        .uploadImageFile(file)
        .finally(() => this.spinner.hide())
        .takeWhile(() => this.viewAlive)
        .subscribe((image: ImageDTO) => {
          this.recipeForm.patchValue({
            imageFile: image
          });
        });
    }
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
      imageFile: [null],
      servings: [null, Validators.required],
      category: [null, Validators.required],
      ingredients: this.fb.array([], Validators.required),
      description: [null, Validators.required]
    });
  }

  private fillForm(): void {
    const currentRecipe: RecipeDTO = this.recipe;
    this.recipeForm.get('name').patchValue(currentRecipe.name);
    this.recipeForm.get('servings').patchValue(currentRecipe.servings ? currentRecipe.servings : 4);
    this.recipeForm
      .get('category')
      .patchValue(currentRecipe.categoryId ? currentRecipe.categoryId : this.categories[0].id);
    currentRecipe.ingredients.map(ingredient => this.addItem(ingredient));
    this.recipeForm.get('description').patchValue(currentRecipe.description);
    this.recipeForm.get('imageFile').patchValue(currentRecipe.imageFile);
  }

  private addItem(ingredient: IngredientDTO): void {
    this.items = this.recipeForm.get('ingredients') as FormArray;
    this.items.push(this.createItem(ingredient));
  }

  private createItem(ingredient: IngredientDTO): FormControl {
    return this.fb.control(ingredient);
  }
}