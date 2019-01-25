import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { CategoryDTO } from 'src/app/shared/services/recipe/transfer/CategoryDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { ImageService, FILE_TOO_LARGE_MSG } from 'src/app/shared/services/image/image.service';
import { IngredientDTO } from 'src/app/shared/services/recipe/transfer/IngredientDTO';
import { ImageDTO } from 'src/app/shared/services/recipe/transfer/ImageDTO';
import { takeWhile } from 'rxjs/operators';
import { INGREDIENT_REGEX } from './edit-recipe-form.constants';
import { SnackbarService } from 'src/app/shared/services/ui/snackbar.service';
import { DialogService } from 'src/app/shared/services/ui/dialog.service';
import { NgxPicaService } from '@digitalascetic/ngx-pica';

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
  viewAlive: boolean = true;
  servingOptions: any = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private imageService: ImageService,
    private spinner: NgxSpinnerService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService,
    private ngxPicaService: NgxPicaService
  ) {}

  ngOnInit(): void {
    this.currentIngredient = '';
    this.currentImageFileName = '';
    this.initForm();
    this.loadAllCategories();
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
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

  onFileChange(event): void {
    if (event.target.files) {
      const [imageFile] = event.target.files;

      this.spinner.show();
      this.imageService
        .uploadImageFile(imageFile)
        .pipe(takeWhile(() => this.viewAlive))
        .subscribe(
          (uploadedImage: ImageDTO) => {
            this.spinner.hide();
            this.recipeForm.patchValue({
              imageFile: uploadedImage
            });
          },
          error => {
            this.spinner.hide();
            if (error.message === FILE_TOO_LARGE_MSG) {
              this.dialogService.openErrorDialog('EDIT_RECIPE.ERROR_IMAGE_TOO_BIG');
            } else {
              this.snackbarService.openShortSnackbar('EDIT_RECIPE.ERROR_IMAGE_UPLOAD');
            }
          }
        );
    }
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
      .pipe(takeWhile(() => this.viewAlive))
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
