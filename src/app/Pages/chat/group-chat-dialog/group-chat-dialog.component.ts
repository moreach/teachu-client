import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ChatUserDTO } from 'src/app/DTOs/xx_old/ChatUserDTO';
import { ChatService } from '../chat.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { v4 as guid } from 'uuid';
import { ChatSaveGroupDTO } from 'src/app/DTOs/xx_old/ChatSaveGroupDTO';

@Component({
  selector: 'app-group-chat-dialog',
  templateUrl: './group-chat-dialog.component.html',
  styleUrls: ['./group-chat-dialog.component.scss']
})
export class GroupChatDialogComponent implements OnInit {

  groupFrom: FormGroup;
  groupFormUserId;
  filteredOptionsGroup$: Observable<ChatUserDTO[]> | undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedUser: string[] = [];
  allUsers: ChatUserDTO[] = [];

  @ViewChild('userIdInput') userIdInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private dialogRef: MatDialogRef<GroupChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: ChatSaveGroupDTO | undefined,
  ) { 
    this.groupFrom = this.formBuilder.group({
      chatId: guid(),
      chatName: ['', Validators.required],
      chatImage: '',
    });

    if (this.dialogData) {
      this.groupFrom.patchValue({
        chatId: this.dialogData.chatId,
        chatName: this.dialogData.chatName,
        chatImage: this.dialogData.chatImage,
      });
      this.selectedUser = this.dialogData.usersId.filter(u => !!u);
    }

    this.groupFormUserId = new FormControl('', () => {
      if (this.selectedUser.length === 0 || this.selectedUser.some(u => !this.allUsers.some(s => s.id === u))) {
        return { invalid: true };
      }
      return null;
    });
  }

  ngOnInit(): void {
    const users$ = this.chatService.getChatUser$();
    users$.subscribe(users => this.allUsers = users);
    this.filteredOptionsGroup$ = combineLatest([
      users$,
      this.groupFormUserId.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, value]) => this._filter(value, users)),
      map(users => users.filter(user => !this.selectedUser.includes(user.id))),
      map(users => users.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))),
    );
  }

  createGroupChat() {
    const value = {
      chatId: this.groupFrom.value.chatId,
      chatName: this.groupFrom.value.chatName,
      chatImage: this.groupFrom.value.chatImage,
      usersId: this.selectedUser,
    }
    this.chatService.createChatGroup$(value).subscribe(_ => {
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

  addUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedUser.push(value);
    }
    event.chipInput!.clear();
    this.selectedUser = this.selectedUser.filter(user => this.allUsers.some(u => u.id === user));
    this.groupFormUserId.setValue(null);
  }

  removeUser(value: string): void {
    const index = this.selectedUser.indexOf(value);
    if (index >= 0) {
      this.selectedUser.splice(index, 1);
    }
    this.groupFormUserId.updateValueAndValidity();
  }

  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUser.push(event.option.value);
    if (this.userIdInput) {
      this.userIdInput.nativeElement.value = '';
    }
    this.groupFormUserId.setValue(null);
    this.groupFormUserId.updateValueAndValidity();
  }
}
