import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { RecipeDTO } from '../../../services/recipe/transfer/RecipeDTO';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../models/view/Breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  public emptyRecipe: RecipeDTO;
  public submitButtonText$: Observable<string>;
  public viewAlive: boolean = true;
  public breadcrumbs: Breadcrumb[];

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.submitButtonText$ = this.translate.get('GENERAL.CREATE');
    this.emptyRecipe = this.recipeService.createEmptyRecipe();
    this.generateBreadcrumbs();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public onRecipeCreated(recipe: RecipeDTO): void {
    this.recipeService
      .createRecipe(recipe)
      .takeWhile(() => this.viewAlive)
      .subscribe(
        (recipe: RecipeDTO) => {
          this.router.navigateByUrl('/recipes');
        },
        error => {
          console.error(error);
        }
      );
  }

  public onAbortClicked(recipe: RecipeDTO): void {
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
