import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RecipeService } from '../../../services/business/recipe.service';
import { chunk } from 'lodash';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../models/view/Breadcrumb';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Recipe } from '../../../models/Recipe';

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
  public mainFilter: string;

  @ViewChild('searchRef')
  searchRef: ElementRef;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.loadUsersRecipes();
    this.generateBreadcrumbs();
    this.initSearch();
  }

  public ngOnDestroy(): void {
    this.viewAlive = false;
  }

  public loadUsersRecipes(filter: string = ''): void {
    this.spinner.show();
    this.recipeService
      .getUsersRecipes(filter)
      .takeWhile(() => this.viewAlive)
      .subscribe(
        result => {
          setTimeout(() => {
            this.spinner.hide();
          }, 300);
          this.chunkedRecipes = chunk(result, this.RECIPES_PER_ROW);
        },
        error => {
          console.error(error);
          setTimeout(() => {
            this.spinner.hide();
          }, 300);
        }
      );
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

  private initSearch(): void {
    Observable.fromEvent(this.searchRef.nativeElement, 'keyup')
      .map((evt: any) => evt.target.value)
      .debounceTime(400)
      .distinctUntilChanged()
      .do(() => this.spinner.show())
      .switchMap((filterText: string) => this.recipeService.getUsersRecipes(filterText))
      .takeWhile(() => this.viewAlive)
      .subscribe((recipes: Recipe[]) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
        this.chunkedRecipes = chunk(recipes, this.RECIPES_PER_ROW);
      });
  }
}
