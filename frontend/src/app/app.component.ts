import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    translate.use('en'); // TODO: load from user personal settings
  }
}
