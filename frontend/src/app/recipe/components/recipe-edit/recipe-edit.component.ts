import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Breadcrumb } from 'src/app/shared/models/Breadcrumb';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { SnackbarService } from 'src/app/shared/services/ui/snackbar.service';
import { finalize, takeWhile, take } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/services/ui/dialog.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public recipe: RecipeDTO;
  public submitButtonText$: Observable<string>;
  public viewAlive: boolean = true;
  public routerLink: string;
  public breadcrumbs: Breadcrumb[];

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: SnackbarService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.submitButtonText$ = this.translate.get('GENERAL.UPDATE');
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadRecipe(id);
    this.routerLink = '/recipe-details/' + id;
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public onRecipeUpdate(recipe: RecipeDTO): void {
    this.spinner.show();
    this.recipeService
      .updateRecipe(recipe, this.recipe.id)
      .pipe(
        finalize(() => this.spinner.hide()),
        takeWhile(() => this.viewAlive)
      )
      .subscribe(
        success => {
          this.snackBar.openShortSnackbar('EDIT_RECIPE.SUCCESS');
          this.navigateToDetailView();
        },
        error => {
          this.snackBar.openShortSnackbar('EDIT_RECIPE.ERROR');
          console.error(error);
        }
      );
  }

  public onDeleteRecipeRequest(): void {
    this.dialogService
      .openConfirmDialog('EDIT_RECIPE_PAGE.DELETE_CONFIRM')
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteRecipe();
        }
      });
  }

  public onAbortClicked(recipe: RecipeDTO): void {
    this.navigateToDetailView();
  }

  private navigateToDetailView(): void {
    this.router.navigateByUrl('/recipes/recipe-details/' + this.recipe.id);
  }

  private loadRecipe(id: number): void {
    this.recipeService
      .getRecipeById(id)
      .pipe(takeWhile(() => this.viewAlive))
      .subscribe(
        recipe => {
          this.recipe = recipe;
          this.generateBreadcrumbs();
        },
        error => console.error(error)
      );
  }

  private deleteRecipe(): void {
    this.spinner.show();
    this.recipeService
      .deleteRecipe(this.recipe.id)
      .pipe(
        finalize(() => this.spinner.hide()),
        takeWhile(() => this.viewAlive)
      )
      .subscribe(
        success => {
          this.snackBar.openShortSnackbar('GENERAL.DELETE_SUCCESS');
          this.router.navigateByUrl('/recipes');
        },
        error => {
          this.snackBar.openShortSnackbar('GENERAL.DELETE_ERROR');
          console.error(error);
        }
      );
  }

  private generateBreadcrumbs(): void {
    const currentRecipe: Breadcrumb = {
      label: this.recipe.name,
      routerlink: '/recipe-details/' + this.recipe.id
    };
    const editRecipe: Breadcrumb = { labelKey: 'NAVIG.EDIT_RECIPE' };

    this.breadcrumbs = [];
    this.breadcrumbs.push(currentRecipe);
    this.breadcrumbs.push(editRecipe);
  }
}
