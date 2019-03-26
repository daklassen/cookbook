import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../iam/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { User } from 'firebase';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUserName: string;
  userPictureUrl: string;
  mobileMenuVisible: boolean;

  private unsubscribe = new Subject<void>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.mobileMenuVisible = false;
    this.authService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user: User) => {
        if (user) {
          this.userPictureUrl = user.photoURL;
          this.currentUserName = user.displayName;
        } else {
          this.userPictureUrl = null;
          this.currentUserName = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLoginClicked(): void {
    this.authService.doGoogleLogin();
  }

  onLogoutClicked(): void {
    this.authService.doLogout().then(() => this.router.navigateByUrl('/home'));
  }

  onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
