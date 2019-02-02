import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap, take, finalize } from 'rxjs/operators';
import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shell/iam/auth.service';
import { User } from 'firebase';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

export const RECIPE_IMAGE_MAX_SIZE_IN_BYTES = 3145728;
export const RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL = 1000;
export const FILE_TOO_LARGE_MSG = 'File too large';

@Injectable()
export class ImageService {
  constructor(
    private storage: AngularFireStorage,
    private ngxPicaService: NgxPicaService,
    private authService: AuthService
  ) {}

  uploadImageFile(imageFile: File, spinner: any): Observable<UploadTaskSnapshot> {
    spinner.show();

    const currentUser$ = this.authService.getCurrentUser().pipe(take(1));
    const resizeImage$ = this.ngxPicaService
      .resizeImage(
        imageFile,
        RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL,
        RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL,
        { aspectRatio: { keepAspectRatio: true } }
      )
      .pipe(take(1));

    return forkJoin(currentUser$, resizeImage$).pipe(
      mergeMap(([user, image]: [User, File]) => {
        const filePath = `recipes/${user.uid}/${imageFile.name}`;
        const task = this.storage.upload(filePath, image);
        return task.snapshotChanges();
      }),
      finalize(() => spinner.hide())
    );
  }
}
