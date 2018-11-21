import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from './services/recipe/recipe.service';
import { ImageService } from './services/image/image.service';
import { HoverClassDirective } from './directives/hover-class.directive';
import { SecurePipe } from './pipes/secure.pipe';
import { SnackbarService } from './services/ui/snackbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [HoverClassDirective, SecurePipe, BreadcrumbComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatSnackBarModule,
    AngularSvgIconModule,
    AngularFontAwesomeModule
  ],
  exports: [
    CommonModule,
    AngularSvgIconModule,
    AngularFontAwesomeModule,
    HoverClassDirective,
    SecurePipe,
    BreadcrumbComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RecipeService, ImageService, SnackbarService]
    };
  }
}
