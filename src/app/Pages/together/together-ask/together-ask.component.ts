import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TogetherAskAnswerDTO } from 'src/app/DTOs/Together/TogetherAskAnswerDTO';
import { TogetherAskOverviewDTO } from 'src/app/DTOs/Together/TogetherAskOverviewDTO';
import { TogetherAskUserDTO } from 'src/app/DTOs/Together/TogetherAskUserDTO';
import { TogetherUserProfileDTO } from 'src/app/DTOs/Together/TogetherUserProfileDTO';
import { getGrades } from 'src/app/DTOs/Enums/Grade';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { TogetherDetailDialogComponent } from '../together-detail-dialog/together-detail-dialog.component';
import { TogetherAskService } from './together-ask.service';

@Component({
  selector: 'app-together-ask',
  templateUrl: './together-ask.component.html',
  styleUrls: ['./together-ask.component.scss']
})
export class TogetherAskComponent implements OnDestroy {

  asks$: Observable<TogetherAskOverviewDTO>;
  filter: FormGroup;
  subjects = getSubjects();
  grades = getGrades();
  filterResult$: Observable<TogetherUserProfileDTO[]>;
  private destroyed$ = new Subject<void>();

  constructor(
    private askService: TogetherAskService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.asks$ = this.askService.getOpenAsks().pipe(takeUntil(this.destroyed$));
    this.filter = this.formBuilder.group({
      username: '',
      grade: -1,
      goodSubject: -1,
      badSubject: -1,
    });
    this.filterResult$ = this.getUsers();
  }

  answerUser(userId: string, answer: boolean) {
    const value = {
      userId,
      answer,
    } as TogetherAskAnswerDTO;
    this.askService.answerUser(value);
  }

  askUser(userId: string) {
    const value = {
      userId,
    } as TogetherAskUserDTO;
    this.askService.askUser(value);
  }

  filterUsers() {
    this.filterResult$ = this.getUsers();
  }

  getUsers() {
    return this.askService.getFilteredUsers(this.filter.value.username, this.filter.value.grade, this.filter.value.goodSubject, this.filter.value.badSubject);
  }

  openDetail(user: TogetherUserProfileDTO) {
    this.dialog.open(TogetherDetailDialogComponent, {
      data: {
        ...user,
        showConnected: false,
      }
    });
  }
  
  isEmpty(users: TogetherUserProfileDTO[]) {
    return users.length === 0;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
