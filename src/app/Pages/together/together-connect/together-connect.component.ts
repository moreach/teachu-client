import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TogetherOverviewUserProfileDTO } from 'src/app/DTOs/Together/TogetherOverviewUserProfileDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { TogetherDetailDialogComponent } from '../together-detail-dialog/together-detail-dialog.component';
import { TogetherConnectService } from './together-connect.service';

@Component({
  selector: 'app-together-connect',
  templateUrl: './together-connect.component.html',
  styleUrls: ['./together-connect.component.scss']
})
export class TogetherConnectComponent implements OnDestroy {

  overview$: Observable<TogetherOverviewUserProfileDTO[]>;
  private destroyed$ = new Subject<void>();

  constructor(
    private connectService: TogetherConnectService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.overview$ = this.connectService.getConnections().pipe(
      takeUntil(this.destroyed$),
      map(cnc => cnc.map(c => {
        return {
          ...c,
          lastMessage: truncateToMaxChars(c.lastMessage ?? '', 100)
        }
      }))
    );
  }

  navigateToChat(userId: string) {
    this.router.navigate([appRoutes.App, appRoutes.TogetherChat, userId]);
  }

  isEmpty(data: TogetherOverviewUserProfileDTO[]) {
    return data.length === 0;
  }

  isToday(date: Date) {
    return isToday(date);
  }

  openDetail(user: TogetherOverviewUserProfileDTO) {
    this.dialog.open(TogetherDetailDialogComponent, {
      data: {
        ...user,
        showConnected: false
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
