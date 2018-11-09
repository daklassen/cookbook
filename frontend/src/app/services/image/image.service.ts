import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { ImageDTO } from '../recipe/transfer/ImageDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImageFile(file: File): Observable<ImageDTO> {
    let formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(environment.apiUrl + '/image', formData)
      .map((response: ImageDTO) => response);
  }
}
