import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');
    translate.use('de'); // TODO: load from user personal settings
  }
}
