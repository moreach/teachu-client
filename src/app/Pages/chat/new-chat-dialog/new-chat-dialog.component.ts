import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChatNewGroupDTO } from 'src/app/DTOs/ChatNewGroupDTO';
import { ChatUserDTO } from 'src/app/DTOs/ChatUserDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss']
})
export class NewChatDialogComponent implements OnInit {

  groupFrom: FormGroupTyped<ChatNewGroupDTO>;
  privateFormUserId = new FormControl('');
  filteredOptions$ = new BehaviorSubject<ChatUserDTO[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private dialogRef: MatDialogRef<NewChatDialogComponent>,
  ) { 
    this.groupFrom = this.formBuilder.group({
      chatName: ['', Validators.required],
      chatImage: '',
      usersId: [],
    }) as FormGroupTyped<ChatNewGroupDTO>;
  }

  ngOnInit(): void {
    combineLatest([
      this.chatService.getChatUser$(),
      this.privateFormUserId.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, value]) => this._filter(value, users))
    ).subscribe(filteredUsers => this.filteredOptions$.next(filteredUsers));
  }

  createPrivateChat(userId: string) {
    this.chatService.createChatPrivate$(userId).subscribe(_ => {
      this.close();
    });
  }

  createGroupChat(value: ChatNewGroupDTO) {
    this.chatService.createChatGroup$(value).subscribe(_ => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  _filter(value: string, users: ChatUserDTO[]): ChatUserDTO[] {
    const filterValue = value.toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  getNameFromId(id: string) {
    const filtered = this.filteredOptions$.value.filter(user => user.id === id);
    if (filtered.length === 0) {
      return '';
    }
    return filtered[0].name;
  }
}
