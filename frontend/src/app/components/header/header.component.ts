import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser;
  public mobileMenuVisible;

  constructor(private keycloakService: KeycloakService) {}

  public ngOnInit() {
    this.loadCurrentUser();
    this.mobileMenuVisible = false;
  }

  public loadCurrentUser(): void {
    this.keycloakService.isLoggedIn().then(userIsLoggedIn => {
      if (userIsLoggedIn) {
        this.currentUser = this.keycloakService.getUsername();
      } else {
        this.currentUser = null;
      }
    });
  }

  public onLoginClicked(): void {
    this.keycloakService.login();
  }

  public onLogoutClicked(): void {
    this.keycloakService.logout(environment.applicationUrl);
  }

  public onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
