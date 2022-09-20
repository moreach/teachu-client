import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { GroupOverviewDTO } from 'src/app/DTOs/Group/GroupOverviewDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { GroupChatService } from './group-chat/group-chat.service';
import { GroupInfoDialogComponent } from './group-info-dialog/group-info-dialog.component';
import { GroupService } from './group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnDestroy {

  overview$: Observable<GroupOverviewDTO[]>;
  private destroyed$ = new Subject<void>();

  constructor(
    private groupService: GroupService,
    private chatService: GroupChatService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.overview$ = this.groupService.getOverview().pipe(
      takeUntil(this.destroyed$),
      map(ovw => ovw.map(grp => {
        return {
          ...grp,
          lastMessage: truncateToMaxChars(grp.lastMessage ?? '', 100),
        }
      }))
    );
  }

  openInfo(groupId: string | null) {
    this.dialog.open(GroupInfoDialogComponent, {
      data: groupId,
    });
  }

  navigateToChat(groupId: string) {
    this.router.navigate([appRoutes.App, appRoutes.GroupChat, groupId]);
  }

  navigateToFiles(groupId: string) {
    this.router.navigate([appRoutes.App, appRoutes.GroupFiles, groupId]);
  }

  translateInfoMessage(message: string) {
    return this.chatService.translateInfoMessage(message);
  }

  isEmpty(overview: GroupOverviewDTO[]) {
    return overview.length === 0;
  }

  isToday(date: Date) {
    return isToday(date);
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}