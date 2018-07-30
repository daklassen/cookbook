import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/business/recipe.service';
import { chunk } from 'lodash';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../models/view/Breadcrumb';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  public RECIPES_PER_ROW: number = 4;
  public chunkedRecipes: any;
  public viewAlive: boolean = true;
  public breadcrumbs: Breadcrumb[];

  constructor(private recipeService: RecipeService, private router: Router) {}

  public ngOnInit(): void {
    this.loadUsersRecipes();
    this.generateBreadcrumbs();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public loadUsersRecipes(): void {
    this.recipeService
      .getUsersRecipes()
      .takeWhile(() => this.viewAlive)
      .subscribe(result => {
        this.chunkedRecipes = chunk(result, this.RECIPES_PER_ROW);
      });
  }

  public onCreateRecipe(): void {
    this.router.navigateByUrl('/recipe-create');
  }

  private generateBreadcrumbs(): void {
    const home: Breadcrumb = { labelKey: 'NAVIG.HOME', routerlink: '/home' };
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };

    this.breadcrumbs = [];
    this.breadcrumbs.push(home);
    this.breadcrumbs.push(recipes);
  }
}
