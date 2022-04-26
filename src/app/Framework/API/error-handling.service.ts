import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { environment } from 'src/environments/environment';
import { ErrorHandlingDialogComponent } from '../error-handling-dialog/error-handling-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private dialog: MatDialog,
  ) { }

  handleError(data: any): Observable<any> {
    const ref = this.dialog.open(ErrorHandlingDialogComponent, {
      data,
      disableClose: true,
    });
    return ref.afterClosed();
  }

  redirectToLogin() {
    self.location.href = `${environment.URL_FRONTEND}${appRoutes.Login}`;
  }
}
