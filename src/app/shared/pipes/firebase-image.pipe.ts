import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Pipe({
  name: 'firebaseImage'
})
export class FirebaseImagePipe implements PipeTransform {
  constructor(private storage: AngularFireStorage) {}

  transform(imagePath: string): Observable<any> {
    if (!imagePath) return;
    const ref = this.storage.ref(imagePath);
    return ref.getDownloadURL();
  }
}
