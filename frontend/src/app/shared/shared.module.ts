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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from './services/ui/dialog.service';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [HoverClassDirective, SecurePipe, BreadcrumbComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularFontAwesomeModule,
    InlineSVGModule.forRoot({ baseUrl: '/' })
  ],
  exports: [
    CommonModule,
    AngularFontAwesomeModule,
    HoverClassDirective,
    SecurePipe,
    BreadcrumbComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RecipeService, ImageService, SnackbarService, DialogService]
    };
  }
}
