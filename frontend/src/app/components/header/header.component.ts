import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

const HOME_URL: string = 'http://localhost:4200'; // TODO

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser;

  constructor(private keycloakService: KeycloakService) { }

  public ngOnInit() {
    this.loadCurrentUser();
  }

  public loadCurrentUser(): void {
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

  public onLoginClicked(): void {
    this.keycloakService.login();
  }

  public onLogoutClicked(): void {
    this.keycloakService.logout(HOME_URL);
  }
}
