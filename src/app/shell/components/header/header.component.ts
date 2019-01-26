import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../iam/auth.service';
import { takeWhile } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  viewAlive: boolean = true;
  currentUser: string;
  mobileMenuVisible: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.mobileMenuVisible = false;
    this.authService
      .getCurrentUser()
      .pipe(takeWhile(() => this.viewAlive))
      .subscribe((user: User) => {
        if (user) this.currentUser = user.displayName;
      });
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  onLoginClicked(): void {
    this.authService.doGoogleLogin();
  }

  onLogoutClicked(): void {
    this.authService.doLogout();
  }

  onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
