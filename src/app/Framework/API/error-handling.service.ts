import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NEVER, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { environment } from 'src/environments/environment';
import { ErrorHandlingDialogComponent } from '../error-handling-dialog/error-handling-dialog.component';
import { removeEmptyAndSpecialChars } from '../Helpers/StringHelpers';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  handleError(data: any): Observable<any> {
    // popup in dev mode, toasty in prod
    if (!environment.IS_PROD) {
      const ref = this.dialog.open(ErrorHandlingDialogComponent, {
        data,
        disableClose: true,
      });
      return ref.afterClosed();
    } else {
      const errorRaw = data.error?.error?.error;
      const error = !!errorRaw ? 'errorBackend.' + removeEmptyAndSpecialChars(errorRaw) : 'errorBackend.unknownError';
      this.displayToastError('errorBackend.errorOccured', error);
      return NEVER;
    }    
  }

  displayToastError(title: string, message: string) {
    this.toastr.show(message, title, {});
  }

  redirectToLogin() {
    self.location.href = `${environment.URL_FRONTEND}${appRoutes.Login}`;
  }
}
