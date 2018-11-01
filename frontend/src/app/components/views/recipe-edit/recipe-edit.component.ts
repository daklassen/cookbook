import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { TranslateService } from '@ngx-translate/core';
import { RecipeDTO } from '../../../services/recipe/transfer/RecipeDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from '../../../models/view/Breadcrumb';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from '../../../../../node_modules/ngx-spinner';

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
    private spinner: NgxSpinnerService
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
      .takeWhile(() => this.viewAlive)
      .subscribe(
        recipe => {
          console.log('Edit was successful');
          this.spinner.hide();
          this.navigateToDetailView();
        },
        error => console.error(error)
      );
  }

  public onDeleteRecipe(): void {
    this.spinner.show();
    this.recipeService
      .deleteRecipe(this.recipe.id)
      .takeWhile(() => this.viewAlive)
      .subscribe(success => {
        this.spinner.show();
        this.router.navigateByUrl('/recipes');
      });
  }

  public onAbortClicked(recipe: RecipeDTO): void {
    this.navigateToDetailView();
  }

  private navigateToDetailView(): void {
    this.router.navigateByUrl('/recipe-details/' + this.recipe.id);
  }

  private loadRecipe(id: number): void {
    this.recipeService
      .getRecipeById(id)
      .takeWhile(() => this.viewAlive)
      .subscribe(
        recipe => {
          this.recipe = recipe;
          this.generateBreadcrumbs();
        },
        error => console.error(error)
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
