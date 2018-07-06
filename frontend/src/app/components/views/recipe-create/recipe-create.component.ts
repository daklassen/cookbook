import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../../../services/business/recipe.service";
import { Recipe } from "../../../models/Recipe";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  emptyRecipe: Recipe;
  submitButtonText: string;

  constructor(
    private recipeService: RecipeService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('GENERAL.CREATE').subscribe(res => this.submitButtonText = res);
    this.emptyRecipe = this.recipeService.createEmptyRecipe();
  }
  
  onRecipeCreated(formValue: any): void {
    this.recipeService.createRecipe(formValue).subscribe(
      test => console.log(test),
      error => console.log(error)
    );
  }
}
