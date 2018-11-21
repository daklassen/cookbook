import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/shared/models/Breadcrumb';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

const REGEX_SPLITTING_DESCRIPTION: any = /\r?\n/g;

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public currentRecipe: RecipeDTO;
  public splittedDescription: Array<string>;
  public viewAlive: boolean = true;
  public breadcrumbs: Breadcrumb[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadRecipe(id);
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public loadRecipe(id: number): void {
    this.recipeService
      .getRecipeById(id)
      .takeWhile(() => this.viewAlive)
      .subscribe(recipe => {
        this.currentRecipe = recipe;
        this.splitDescription();
        this.generateBreadcrumbs();
      });
  }

  public splitDescription(): void {
    if (this.currentRecipe) {
      this.splittedDescription = this.currentRecipe.description
        .split(REGEX_SPLITTING_DESCRIPTION)
        .filter(descBlock => descBlock.length !== 0);
    }
  }

  public onEditRecipe(): void {
    this.router.navigateByUrl('recipes/recipe-edit/' + this.currentRecipe.id);
  }

  private generateBreadcrumbs(): void {
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };
    const currentRecipe: Breadcrumb = { label: this.currentRecipe.name };

    this.breadcrumbs = [];
    this.breadcrumbs.push(recipes);
    this.breadcrumbs.push(currentRecipe);
  }
}
