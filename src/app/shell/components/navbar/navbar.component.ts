import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../iam/auth.service';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  viewAlive: boolean = true;
  currentUserName: string;
  userPictureUrl: string;
  mobileMenuVisible: boolean;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.mobileMenuVisible = false;
    this.authService
      .getCurrentUser()
      .pipe(takeWhile(() => this.viewAlive))
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
    this.viewAlive = false;
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
