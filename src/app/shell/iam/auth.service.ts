import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User, auth } from 'firebase';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<User> {
    return this.afAuth.user;
  }

  doGoogleLogin(): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider);
  }

  doLogout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
