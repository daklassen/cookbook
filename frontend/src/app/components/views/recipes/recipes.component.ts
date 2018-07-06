import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/business/recipe.service';
import { chunk } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  RECIPES_PER_ROW: number = 4;
  chunkedRecipes: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadUsersRecipes();
  }

  loadUsersRecipes(): void {
    this.recipeService.getUsersRecipes()
      .subscribe(
        result => {
          this.chunkedRecipes = chunk(result, this.RECIPES_PER_ROW);
        }
      );
  }

  onCreateRecipe(): void {
    this.router.navigateByUrl('/recipe-create');
  }

}
