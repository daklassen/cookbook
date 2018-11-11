import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {}

  openShortSnackbar(translationKey: string) {
    this.translate
      .get(translationKey)
      .take(1)
      .subscribe(value => {
        this.snackBar.open(value, '', { duration: config.snackBarDurationShort });
      });
  }
}
