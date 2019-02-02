import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from './services/recipe/recipe.service';
import { ImageService } from './services/image/image.service';
import { HoverClassDirective } from './directives/hover-class.directive';
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
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FirebaseImagePipe } from './pipes/firebase-image.pipe';

@NgModule({
  declarations: [
    HoverClassDirective,
    BreadcrumbComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    FileUploadComponent,
    FirebaseImagePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularFontAwesomeModule,
    InlineSVGModule.forRoot({ baseUrl: '/' }),
    NgxPicaModule
  ],
  exports: [
    CommonModule,
    AngularFontAwesomeModule,
    HoverClassDirective,
    FileUploadComponent,
    FirebaseImagePipe,
    BreadcrumbComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgxPicaModule
  ],
  entryComponents: [ConfirmDialogComponent, ErrorDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RecipeService, ImageService, SnackbarService, DialogService]
    };
  }
}
