import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDTO } from '../recipe/transfer/ImageDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, flatMap } from 'rxjs/operators';
import { NgxPicaService } from '@digitalascetic/ngx-pica';

export const RECIPE_IMAGE_MAX_SIZE_IN_BYTES = 3145728;
export const RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL = 1000;
export const FILE_TOO_LARGE_MSG = 'File too large';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient, private ngxPicaService: NgxPicaService) {}

  uploadImageFile(imageFile: File): Observable<ImageDTO> {
    if (imageFile.size > RECIPE_IMAGE_MAX_SIZE_IN_BYTES) {
      return Observable.create(subscriber => {
        subscriber.error(new Error(FILE_TOO_LARGE_MSG));
      });
    }

    return this.ngxPicaService
      .resizeImage(
        imageFile,
        RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL,
        RECIPE_IMAGE_MAX_HEIGHT_OR_WIDTH_IN_PIXEL,
        { aspectRatio: { keepAspectRatio: true } }
      )
      .pipe(
        flatMap((resizedImage: File) => {
          const formData = new FormData();
          formData.append('file', resizedImage);
          return this.http
            .post(environment.apiUrl + '/image', formData)
            .pipe(map((response: ImageDTO) => response));
        })
      );
  }
}
