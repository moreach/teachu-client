import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NEVER, Observable } from 'rxjs';
import { appConfig } from 'src/app/Config/appConfig';
import { appRoutes } from 'src/app/Config/appRoutes';
import { environment } from 'src/environments/environment';
import { ErrorHandlingDialogComponent } from '../error-handling-dialog/error-handling-dialog.component';

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
      const error = 'errorBackend.' + (data.error?.error?.error ?? 'unknownError');
      this.displayToastError(error + appConfig.BACKEND_ERROR_TITLE_SUFFIX, error);
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
