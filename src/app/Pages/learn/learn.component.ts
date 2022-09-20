import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { LearnSessionDTO } from 'src/app/DTOs/Learn/LearnSessionDTO';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { LearnCreateDialogComponent } from './learn-create-dialog/learn-create-dialog.component';
import { LearnService } from './learn.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent {

  openSessions$: Observable<LearnSessionDTO[]>;
  closedSessions$: Observable<LearnSessionDTO[]>;

  constructor(
    private learnService: LearnService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.openSessions$ = this.learnService.getOpenSessions$();
    this.closedSessions$ = this.learnService.getClosedSessions$();
  }

  createNew() {
    this.dialog.open(LearnCreateDialogComponent, {
      data: {
        setEditable: true,
      }
    });
  }

  openSessionStepper(sessionId: string) {
    this.router.navigate([appRoutes.App, appRoutes.Learn, appRoutes.LearnWrite, sessionId]);
  }

  isEmpty(value: any[]) {
    return value.length === 0;
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
  }

  calculateProgress(value: LearnSessionDTO) {
    const answered = value.numberOfRightAnswers + value.numberOfWrongAnswers;
    const total = answered + value.numberOfNotAnswerd;
    if (total == 0) {
      return 0;
    }
    return Math.round(answered / total * 100 * 100) / 100;
  }

  calculatePercentage(value: LearnSessionDTO) {
    const rightAnsweres = value.numberOfRightAnswers;
    const total = value.numberOfRightAnswers + value.numberOfWrongAnswers + value.numberOfNotAnswerd;
    if (total == 0) {
      return 0;
    }
    return Math.round(rightAnsweres / total * 100 * 100) / 100;
  }
}
