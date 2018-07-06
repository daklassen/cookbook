import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './services/security/app-init';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/security/auth-guard.service';
import { RecipeService } from './services/business/recipe.service';
import { HoverClassDirective } from './directives/hover-class.directive';
import { RecipesComponent } from './components/views/recipes/recipes.component';
import { RecipeDetailComponent } from './components/views/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/views/recipe-create/recipe-create.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRecipeFormComponent } from './components/elements/edit-recipe-form/edit-recipe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HoverClassDirective,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeCreateComponent,
    EditRecipeFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
