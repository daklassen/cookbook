import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { CategoryDTO } from 'src/app/shared/services/recipe/transfer/CategoryDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { IngredientDTO } from 'src/app/shared/services/recipe/transfer/IngredientDTO';
import { takeUntil } from 'rxjs/operators';
import { INGREDIENT_REGEX } from './edit-recipe-form.constants';
import { DialogService } from 'src/app/shared/services/ui/dialog.service';
import { Observable, Subject } from 'rxjs';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

export const RECIPE_IMAGE_MAX_SIZE_IN_BYTES = 3145728;
export const RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL = 1000;
export const FILE_TOO_LARGE_MSG = 'File too large';

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
    return INGREDIENT_REGEX.test(this.currentIngredient);
  }

  recipeForm: FormGroup;
  items: FormArray;
  currentIngredient: string;
  currentImageFileName: string;
  categories: CategoryDTO[];
  servingOptions: any = [1, 2, 3, 4, 5, 6, 7, 8];
  percentageUpload: Observable<number>;

  private unsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.currentIngredient = '';
    this.currentImageFileName = '';
    this.initForm();
    this.loadAllCategories();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ingredientToString(ingredient: IngredientDTO): string {
    return this.recipeService.formatIngredientToString(ingredient);
  }

  onSubmit(formValue): void {
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

  onAbortClicked() {
    this.aborted.emit(this.recipe);
  }

  onFileChange(imageFile: File): void {
    if (imageFile.size > RECIPE_IMAGE_MAX_SIZE_IN_BYTES) {
      this.dialogService.openErrorDialog('EDIT_RECIPE.ERROR_IMAGE_TOO_BIG');
      return;
    }
    this.imageService
      .uploadImageFile(imageFile, this.spinner)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((taskSnapshot: UploadTaskSnapshot) => {
        const metadata = taskSnapshot.metadata;
        if (metadata) {
          this.recipeForm.patchValue({
            imageFile: metadata.fullPath
          });
        }
      });
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
    this.recipeService
      .getAllCategories()
      .pipe(takeUntil(this.unsubscribe))
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
