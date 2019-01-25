import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Breadcrumb } from 'src/app/shared/models/Breadcrumb';
import { SnackbarService } from 'src/app/shared/services/ui/snackbar.service';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { RecipeDTO, Recipe } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { takeWhile } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  emptyRecipe: RecipeDTO;
  viewAlive: boolean = true;
  breadcrumbs: Breadcrumb[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.emptyRecipe = new Recipe();
    this.generateBreadcrumbs();
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  onRecipeCreated(recipe: RecipeDTO): void {
    this.spinner.show();
    this.recipeService
      .createRecipe(recipe)
      .pipe(takeWhile(() => this.viewAlive))
      .subscribe(
        (docRef: DocumentReference) => {
          this.snackBar.openShortSnackbar('CREATE_RECIPE_PAGE.SUCCESS');
          this.router.navigateByUrl('/recipes');
        },
        error => {
          this.snackBar.openShortSnackbar('CREATE_RECIPE_PAGE.ERROR');
          console.error(error);
        }
      );
  }

  onAbortClicked(): void {
    this.router.navigateByUrl('/recipes');
  }

  private generateBreadcrumbs(): void {
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };
    const createRecipe: Breadcrumb = { labelKey: 'NAVIG.CREATE_RECIPE' };

    this.breadcrumbs = [];
    this.breadcrumbs.push(recipes);
    this.breadcrumbs.push(createRecipe);
  }
}
