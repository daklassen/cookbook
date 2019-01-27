import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map((user: User) => !!user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/home');
        }
      })
    );
  }
}
