import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './services/security/app-init';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/views/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from './services/recipe/recipe.service';
import { ImageService } from './services/image/image.service';
import { SecurePipe } from './pipes/secure.pipe';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';

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
    BreadcrumbComponent,
    SecurePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    RecipeService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
