import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TogetherSwipeDTO } from 'src/app/DTOs/Together/TogetherSwipeDTO';
import { TogetherUserProfileDTO } from 'src/app/DTOs/Together/TogetherUserProfileDTO';
import { TogetherDetailDialogComponent } from '../together-detail-dialog/together-detail-dialog.component';
import { TogetherSwipeService } from './together-swipe.service';

@Component({
  selector: 'app-together-swipe',
  templateUrl: './together-swipe.component.html',
  styleUrls: ['./together-swipe.component.scss']
})
export class TogetherSwipeComponent implements OnDestroy {

  swipe$: Observable<TogetherUserProfileDTO>;
  private destroyed$ = new Subject<void>();

  constructor(
    private swipeService: TogetherSwipeService,
    private dialog: MatDialog,
  ) {
    this.swipe$ = this.swipeService.getNextSwipe();
    this.swipeService.connectionOccured().pipe(
      takeUntil(this.destroyed$),
    ).subscribe(user => {
      this.openConnected(user);
    });
  }

  swipe(userId: string, choice: boolean) {
    const value = {
      userId,
      choice
    } as TogetherSwipeDTO;
    this.swipeService.swipe(value).subscribe(_ => {
      this.swipe$ = this.swipeService.getNextSwipe();
    });
  }

  translateSubject(subject: number) {
    return this.swipeService.translateSubject(subject);
  }
  
  translateGrade(grade: number) {
    return this.swipeService.translateGrade(grade);
  }

  openConnected(user: TogetherUserProfileDTO) {
    this.dialog.open(TogetherDetailDialogComponent, {
      data: {
        ...user,
        showConnected: true
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
