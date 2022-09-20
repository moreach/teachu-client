import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { GroupMessageChatDTO } from 'src/app/DTOs/Group/GroupMessageChatDTO';
import { GroupMessageSendDTO } from 'src/app/DTOs/Group/GroupMessageSendDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { GroupInfoDialogComponent } from '../group-info-dialog/group-info-dialog.component';
import { GroupChatService } from './group-chat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnDestroy {

  private groupId: string;
  private destroyed$ = new Subject<void>();
  chat$: Observable<GroupMessageChatDTO>;
  newMessageControl = new FormControl('');
  
  constructor(
    private chatService: GroupChatService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.groupId = this.activatedRoute.snapshot.paramMap.get(appRoutes.GroupChatId) ?? '';
    this.chat$ = this.chatService.getMessages(this.groupId).pipe(takeUntil(this.destroyed$));
  }

  openInfo() {
    this.dialog.open(GroupInfoDialogComponent, {
      data: this.groupId
    });
  }

  translateInfoMessage(message: string) {
    return this.chatService.translateInfoMessage(message);
  }

  isToday(date: Date) {
    return isToday(date);
  }

  sendMessage() {
    const value = {
      groupId: this.groupId,
      message: this.newMessageControl.value,
    } as GroupMessageSendDTO;
    this.chatService.sendMessage(value).subscribe(_ => {
      this.newMessageControl.patchValue('');
      this.newMessageControl.markAsPristine();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
