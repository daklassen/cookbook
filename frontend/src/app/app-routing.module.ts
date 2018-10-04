import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/views/recipes/recipes.component';
import { RecipeDetailComponent } from './components/views/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/views/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/views/recipe-edit/recipe-edit.component';
import { AppAuthGuard } from './app.auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent, canActivate: [AppAuthGuard] },
  { path: 'recipe-details/:id', component: RecipeDetailComponent, canActivate: [AppAuthGuard] },
  { path: 'recipe-create', component: RecipeCreateComponent, canActivate: [AppAuthGuard] },
  { path: 'recipe-edit/:id', component: RecipeEditComponent, canActivate: [AppAuthGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
