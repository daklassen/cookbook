import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/shared/models/Breadcrumb';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const REGEX_SPLITTING_DESCRIPTION: any = /\r?\n/g;

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipe: RecipeDTO;
  recipeId: string;
  splittedDescription: Array<string>;
  breadcrumbs: Breadcrumb[];

  private unsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeId = id;
    this.loadRecipe(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadRecipe(id: string): void {
    this.recipeService
      .getRecipeById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(recipe => {
        this.currentRecipe = recipe;
        this.splitDescription();
        this.generateBreadcrumbs();
      });
  }

  splitDescription(): void {
    if (this.currentRecipe) {
      this.splittedDescription = this.currentRecipe.description
        .split(REGEX_SPLITTING_DESCRIPTION)
        .filter(descBlock => descBlock.length !== 0);
    }
  }

  onEditRecipe(): void {
    this.router.navigateByUrl('recipes/recipe-edit/' + this.recipeId);
  }

  private generateBreadcrumbs(): void {
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };
    const currentRecipe: Breadcrumb = { label: this.currentRecipe.name };

    this.breadcrumbs = [];
    this.breadcrumbs.push(recipes);
    this.breadcrumbs.push(currentRecipe);
  }
}
