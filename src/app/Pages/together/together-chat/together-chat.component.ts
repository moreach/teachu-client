import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TogetherChatDTO } from 'src/app/DTOs/Together/TogetherChatDTO';
import { TogetherChatSendMessageDTO } from 'src/app/DTOs/Together/TogetherChatSendMessageDTO';
import { TogetherUserProfileDTO } from 'src/app/DTOs/Together/TogetherUserProfileDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { TogetherDetailDialogComponent } from '../together-detail-dialog/together-detail-dialog.component';
import { TogetherChatService } from './together-chat.service';

@Component({
  selector: 'app-together-chat',
  templateUrl: './together-chat.component.html',
  styleUrls: ['./together-chat.component.scss']
})
export class TogetherChatComponent implements OnDestroy {

  chat$: Observable<TogetherChatDTO>;
  private destroyed$ = new Subject<void>();
  newMessageControl = new FormControl('');
  chatId: string;

  constructor(
    private chatService: TogetherChatService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TogetherChatId) ?? '';
    this.chat$ = this.chatService.getMessages(this.chatId).pipe(takeUntil(this.destroyed$));
  }

  isToday(date: Date) {
    return isToday(date);
  }

  sendMessage() {
    const value = {
      userId: this.chatId,
      message: this.newMessageControl.value,
    } as TogetherChatSendMessageDTO;
    this.chatService.sendMessage(value).subscribe(_ => {
      this.newMessageControl.patchValue('');
      this.newMessageControl.markAsPristine();
    });
  }

  openDetail(user: TogetherUserProfileDTO) {
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
