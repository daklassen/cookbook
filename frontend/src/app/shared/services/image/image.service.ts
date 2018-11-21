import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDTO } from '../recipe/transfer/ImageDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImageFile(file: File): Observable<ImageDTO> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(environment.apiUrl + '/image', formData)
      .pipe(map((response: ImageDTO) => response));
  }
}
