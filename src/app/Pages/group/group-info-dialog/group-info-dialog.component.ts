import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { GroupInfoDTO } from 'src/app/DTOs/Group/GroupInfoDTO';
import { GroupInfoDialogService } from './group-info-dialog.service';
import { v4 as guid } from 'uuid';
import { GroupPossibleUserDTO } from 'src/app/DTOs/Group/GroupPossibleUserDTO';
import { imageTypes } from 'src/app/Framework/Helpers/FileTypesHelper';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { GroupInfoCreateDTO } from 'src/app/DTOs/Group/GroupInfoCreateDTO';
import { FileFrontendDTO } from 'src/app/DTOs/File/FileFrontendDTO';

@Component({
  selector: 'app-group-info-dialog',
  templateUrl: './group-info-dialog.component.html',
  styleUrls: ['./group-info-dialog.component.scss']
})
export class GroupInfoDialogComponent implements OnInit {

  isEditMode = false;
  isNewGroup = false;
  groupInfo$: Observable<GroupInfoDTO> | undefined;
  formGroup: FormGroup;
  groupFormUserId;
  filteredOptionsGroup$: Observable<GroupPossibleUserDTO[]> | undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedUser: string[] = [];
  allUsers: GroupPossibleUserDTO[] = [];
  ready$: Observable<boolean> | undefined;

  @ViewChild('userIdInput') userIdInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private infoDialogService: GroupInfoDialogService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string | null,
    private dialogRef: MatDialogRef<GroupInfoDialogComponent>,
  ) {
    this.formGroup = this.formBuilder.group({
      groupId: null,
      description: ['', Validators.required],
      name: ['', Validators.required],
      profileImage: {
        path: '',
        byteString: '',
        externalFilename: ''
      } as FileFrontendDTO,
      profileImagePath: ['', Validators.required],
    });
    if (data === null) {
      this.isNewGroup = true;
      this.isEditMode = true;
      this.formGroup.controls["groupId"].patchValue(guid());
    } else {
      this.groupInfo$ = this.infoDialogService.getGroupInfo(data);
    }

    this.groupFormUserId = new FormControl('', () => {
      if (this.selectedUser.length === 0 || this.selectedUser.some(u => !this.allUsers.some(s => s.userId === u))) {
        return { invalid: true };
      }
      return null;
    });
  }

  ngOnInit(): void {
    const possibleUsers$ = this.infoDialogService.getPossibleUsers();
    this.ready$ = possibleUsers$.pipe(map(_ => true));
    possibleUsers$.subscribe(users => this.allUsers = users);
    this.filteredOptionsGroup$ = combineLatest([
      possibleUsers$,
      this.groupFormUserId.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, value]) => this.filter(value, users)),
      map(users => users.filter(user => !this.selectedUser.includes(user.userId))),
      map(users => users.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))),
    );
  }

  fileTypes(): string {
    return imageTypes();
  }

  edit(groupInfo: GroupInfoDTO) {
    this.selectedUser = groupInfo.members.map(user => user.userId).filter(userId => this.getNameFromId(userId) !== '');
    this.formGroup.patchValue({
      groupId: groupInfo.groupId,
      description: groupInfo.description,
      name: groupInfo.name,
      profileImage: groupInfo.profileImage,
      profileImagePath: groupInfo.profileImage.path
    });
    this.isEditMode = true;
  }

  leaveGroup(groupId: string) {
    this.infoDialogService.leaveGroup({ groupId }).subscribe(_ => this.dialogRef.close());
  }

  upsertGroup() {
    const value = {
      groupId: this.formGroup.value.groupId,
      name: this.formGroup.value.name,
      profileImagePath: this.formGroup.value.profileImagePath,
      description: this.formGroup.value.description,
      members: this.selectedUser    
    } as GroupInfoCreateDTO;
    this.infoDialogService.upsertGroup(value).subscribe(_ => this.dialogRef.close());
  }

  closeDialog() {
    this.dialogRef.close();
  }

  filter(value: string | null, users: GroupPossibleUserDTO[]): GroupPossibleUserDTO[] {
    const filterValue = (value ?? '').toLowerCase();
    return users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  getNameFromId(userId: string) {
    const filtered = this.allUsers.filter(user => user.userId === userId);
    if (filtered.length === 0) {
      return '';
    }
    return filtered[0].username;
  }

  addUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedUser.push(value);
    }
    event.chipInput!.clear();
    this.selectedUser = this.selectedUser.filter(user => this.allUsers.some(u => u.userId === user));
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
