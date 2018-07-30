import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/business/recipe.service';
import { Recipe } from '../../../models/Recipe';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../models/view/Breadcrumb';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  public emptyRecipe: Recipe;
  public submitButtonText: string;
  public viewAlive: boolean = true;
  public breadcrumbs: Breadcrumb[];

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.translate.get('GENERAL.CREATE').subscribe(res => (this.submitButtonText = res));
    this.emptyRecipe = this.recipeService.createEmptyRecipe();
    this.generateBreadcrumbs();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public onRecipeCreated(formValue: any): void {
    this.recipeService
      .createRecipe(formValue)
      .takeWhile(() => this.viewAlive)
      .subscribe(
        (recipe: Recipe) => {
          this.router.navigateByUrl('/recipes');
        },
        error => {
          console.error(error);
        }
      );
  }

  public onAbortClicked(recipe: Recipe): void {
    this.router.navigateByUrl('/recipes');
  }

  private generateBreadcrumbs(): void {
    const home: Breadcrumb = { labelKey: 'NAVIG.HOME', routerlink: '/home' };
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };
    const createRecipe: Breadcrumb = { labelKey: 'NAVIG.CREATE_RECIPE' };

    this.breadcrumbs = [];
    this.breadcrumbs.push(home);
    this.breadcrumbs.push(recipes);
    this.breadcrumbs.push(createRecipe);
  }
}
