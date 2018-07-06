import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

const HOME_URL: string = 'http://localhost:4200'; // TODO

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.keycloakService.isLoggedIn()
      .then(userIsLoggedIn => {
        if (userIsLoggedIn) {
          this.currentUser = this.keycloakService.getUsername();
        } else {
          this.currentUser = null;
        }
      }
    );
  }

  onLoginClicked(): void {
    this.keycloakService.login();
  }

  onLogoutClicked(): void {
    this.keycloakService.logout(HOME_URL);
  }
}
