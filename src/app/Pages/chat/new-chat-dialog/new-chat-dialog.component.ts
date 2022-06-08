import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { ChatNewGroupDTO } from 'src/app/DTOs/ChatNewGroupDTO';
import { ChatUserDTO } from 'src/app/DTOs/ChatUserDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { ChatService } from '../chat.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss']
})
export class NewChatDialogComponent implements OnInit {

  groupFrom: FormGroupTyped<ChatNewGroupDTO>;
  privateFormUserId = new FormControl('');
  groupFormUserId = new FormControl('');
  filteredOptionsPrivate$ = new BehaviorSubject<ChatUserDTO[]>([]);
  filteredOptionsGroup$: Observable<ChatUserDTO[]> | undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedUser: string[] = [];

  @ViewChild('userIdInput') userIdInput: ElementRef<HTMLInputElement> | undefined;

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
    ).subscribe(filteredUsers => this.filteredOptionsPrivate$.next(filteredUsers));

    this.filteredOptionsGroup$ = combineLatest([
      this.chatService.getChatUser$(),
      this.groupFormUserId.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, value]) => this._filter(value, users))
    );
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
    const filtered = this.filteredOptionsPrivate$.value.filter(user => user.id === id);
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
    this.groupFormUserId.setValue(null);
  }

  removeUser(value: string): void {
    const index = this.selectedUser.indexOf(value);
    if (index >= 0) {
      this.selectedUser.splice(index, 1);
    }
  }

  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUser.push(event.option.value);
    if (this.userIdInput) {
      this.userIdInput.nativeElement.value = '';
    }
    this.groupFormUserId.setValue(null);
  }
}
