import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  takeUntil
} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Animations } from 'src/app/shared/animations/animations';
import { Breadcrumb } from 'src/app/shared/models/Breadcrumb';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { RecipeDTO } from 'src/app/shared/services/recipe/transfer/RecipeDTO';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-recipes',
  animations: [Animations.fadeInAndOut],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  allRecipes: RecipeDTO[];
  breadcrumbs: Breadcrumb[];
  mainFilter: string;

  @ViewChild('searchRef')
  searchRef: ElementRef;

  private unsubscribe = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadUsersRecipes();
    this.generateBreadcrumbs();
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadUsersRecipes(filter: string = ''): void {
    this.recipeService
      .getUsersRecipes(filter)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (result: RecipeDTO[]) => {
          this.allRecipes = result;
        },
        error => {
          console.error(error);
        }
      );
  }

  onCreateRecipe(): void {
    this.router.navigateByUrl('recipes/recipe-create');
  }

  private generateBreadcrumbs(): void {
    const home: Breadcrumb = { labelKey: 'NAVIG.HOME', routerlink: '/home' };
    const recipes: Breadcrumb = { labelKey: 'NAVIG.RECIPES', routerlink: '/recipes' };

    this.breadcrumbs = [];
    this.breadcrumbs.push(home);
    this.breadcrumbs.push(recipes);
  }

  private initSearch(): void {
    fromEvent(this.searchRef.nativeElement, 'keyup')
      .pipe(
        map((evt: any) => evt.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.spinner.show()),
        switchMap((filterText: string) => this.recipeService.getUsersRecipes(filterText)),
        takeUntil(this.unsubscribe)
      )
      .subscribe((recipes: RecipeDTO[]) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
        this.allRecipes = recipes;
      });
  }
}
