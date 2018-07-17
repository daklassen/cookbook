import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../../../services/business/recipe.service";
import { Recipe } from "../../../models/Recipe";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  public emptyRecipe: Recipe;
  public submitButtonText: string;

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.translate.get('GENERAL.CREATE').subscribe(res => this.submitButtonText = res);
    this.emptyRecipe = this.recipeService.createEmptyRecipe();
  }
  
  public onRecipeCreated(formValue: any): void {
    this.recipeService.createRecipe(formValue).subscribe(
      test => console.log(test),
      error => console.log(error)
    );
  }

  public onAbortClicked(recipe: Recipe): void {
    this.router.navigateByUrl('/recipes');
  }
}
