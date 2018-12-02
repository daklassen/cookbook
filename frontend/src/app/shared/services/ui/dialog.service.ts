import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private matDialog: MatDialog, private translate: TranslateService) {}

  openConfirmDialog(translationKey: string): Observable<boolean> {
    return this.matDialog
      .open(ConfirmDialogComponent, {
        data: {
          translationKey: translationKey
        },
        width: '400px'
      })
      .afterClosed();
  }
}
