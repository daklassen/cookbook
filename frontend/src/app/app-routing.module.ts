import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/views/recipes/recipes.component';
import { RecipeDetailComponent } from './components/views/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/views/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/views/recipe-edit/recipe-edit.component';

const asd: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe-details/:id', component: RecipeDetailComponent },
  { path: 'recipe-create', component: RecipeCreateComponent },
  { path: 'recipe-edit/:id', component: RecipeEditComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(asd)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
