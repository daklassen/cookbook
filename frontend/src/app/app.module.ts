import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './services/security/app-init';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthGuardService } from './services/security/auth-guard.service';
import { RecipeService } from './services/business/recipe.service';
import { HoverClassDirective } from './directives/hover-class.directive';
import { RecipesComponent } from './components/views/recipes/recipes.component';
import { RecipeDetailComponent } from './components/views/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/views/recipe-create/recipe-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRecipeFormComponent } from './components/elements/edit-recipe-form/edit-recipe-form.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RecipeEditComponent } from './components/views/recipe-edit/recipe-edit.component';
import { BreadcrumbComponent } from './components/elements/breadcrumb/breadcrumb.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    EditRecipeFormComponent,
    RecipeEditComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
export class AppModule {}
