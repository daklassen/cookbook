import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/business/recipe.service';
import { Recipe } from '../../../models/Recipe';

const REGEX_SPLITTING_DESCRIPTION: any = /\r?\n/g;

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  currentRecipe: Recipe;
  splittedDescription: Array<string>

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadRecipe(id);
  }

  loadRecipe(id: number):void {
    this.recipeService.getRecipeById(id)
      .subscribe(
        recipe => {
          this.currentRecipe = recipe;
          this.splitDescription();
        }
      );
  }

  splitDescription():void {
    if (this.currentRecipe) {
      this.splittedDescription = this.currentRecipe.description.split(REGEX_SPLITTING_DESCRIPTION);
    }
  }

  formatAmount (value) {
    if (value === 0) {
      return ''
    } else {
      return value
    }
  }

}
