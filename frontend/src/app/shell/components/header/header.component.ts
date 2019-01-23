import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  mobileMenuVisible: boolean;
  loginBtnText$: Observable<string>;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.mobileMenuVisible = false;
    this.loginBtnText$ = this.translate.get('USER.LOGIN');
  }

  loadCurrentUser(): void {
    // TODO:
  }

  onLoginClicked(): void {
    // TODO:
  }

  onLogoutClicked(): void {
    // TODO:
  }

  onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
