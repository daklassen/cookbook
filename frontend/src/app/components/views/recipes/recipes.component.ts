import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../../../services/business/recipe.service";
import { chunk } from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit, OnDestroy {
  public RECIPES_PER_ROW: number = 4;
  public chunkedRecipes: any;
  public viewAlive: boolean = true;

  constructor(private recipeService: RecipeService, private router: Router) {}

  public ngOnInit(): void {
    this.loadUsersRecipes();
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
    this.router.navigateByUrl("/recipe-create");
  }
}
