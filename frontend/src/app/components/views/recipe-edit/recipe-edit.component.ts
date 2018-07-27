import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/business/recipe.service';
import { TranslateService } from '@ngx-translate/core';
import { Recipe } from '../../../models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public submitButtonText: string;
  public viewAlive: boolean = true;
  public routerLink: string;

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.translate
      .get('GENERAL.UPDATE')
      .takeWhile(() => this.viewAlive)
      .subscribe(res => (this.submitButtonText = res));
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadRecipe(id);
    this.routerLink = '/recipe-details/' + id;
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public onRecipeUpdate(formValue: any): void {
    this.recipeService
      .updateRecipe(formValue, this.recipe.id)
      .takeWhile(() => this.viewAlive)
      .subscribe(test => console.log(test), error => console.log(error));
  }

  public onAbortClicked(recipe: Recipe): void {
    this.router.navigateByUrl('/recipe-details/' + this.recipe.id);
  }

  private loadRecipe(id: number): void {
    this.recipeService
      .getRecipeById(id)
      .takeWhile(() => this.viewAlive)
      .subscribe(recipe => (this.recipe = recipe), error => console.error(error));
  }
}
