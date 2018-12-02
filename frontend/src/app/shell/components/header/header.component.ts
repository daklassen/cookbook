import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser: string;
  public mobileMenuVisible: boolean;
  public loginBtnText$: Observable<string>;

  constructor(private keycloakService: KeycloakService, private translate: TranslateService) {}

  public ngOnInit() {
    this.loadCurrentUser();
    this.mobileMenuVisible = false;
    this.loginBtnText$ = this.translate.get('USER.LOGIN');
  }

  public loadCurrentUser(): void {
    this.keycloakService.isLoggedIn().then(userIsLoggedIn => {
      if (userIsLoggedIn) {
        this.keycloakService.loadUserProfile().then(profile => {
          console.log(profile);
          this.currentUser = profile.firstName;
        });
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
