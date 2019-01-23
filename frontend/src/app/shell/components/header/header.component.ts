import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../iam/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  mobileMenuVisible: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.mobileMenuVisible = false;
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
