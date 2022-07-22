import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ChatUserDTO } from 'src/app/DTOs/xx_old/ChatUserDTO';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-private-chat-dialog',
  templateUrl: './private-chat-dialog.component.html',
  styleUrls: ['./private-chat-dialog.component.scss']
})
export class PrivateChatDialogComponent implements OnInit {

  privateFormUserId = new FormControl('');
  filteredOptionsPrivate$: Observable<ChatUserDTO[]> | undefined;
  allUsers: ChatUserDTO[] = [];

  constructor(
    private chatService: ChatService,
    private dialogRef: MatDialogRef<PrivateChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: { userId: string | undefined },
  ) { 
    if (this.dialogData.userId) {
      this.privateFormUserId.setValue(this.dialogData.userId);
    }
  }

  ngOnInit(): void {
    const allUsers$ = this.chatService.getChatUser$();
    allUsers$.subscribe(users => this.allUsers = users);
    this.filteredOptionsPrivate$ = combineLatest([
      allUsers$,
      this.privateFormUserId.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, value]) => this._filter(value, users)),
      map(users => users.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))),
    );

    this.privateFormUserId.addValidators(() => {
      if (!this.allUsers.some(user => user.id === this.privateFormUserId.value)) {
        return { invalid: true };
      }
      return null;
    })
  }

  createPrivateChat(userId: string) {
    this.chatService.createChatPrivate$(userId).subscribe(_ => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  _filter(value: string | null, users: ChatUserDTO[]): ChatUserDTO[] {
    const filterValue = (value ?? '').toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  getNameFromId(id: string) {
    const filtered = this.allUsers.filter(user => user.id === id);
    if (filtered.length === 0) {
      return '';
    }
    return filtered[0].name;
  }
}
