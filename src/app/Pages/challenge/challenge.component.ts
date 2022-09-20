import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChallengeOpenDTO } from 'src/app/DTOs/Challenge/ChallengeOpenDTO';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { ChallengeCreateDialogComponent } from './challenge-create-dialog/challenge-create-dialog.component';
import { ChallengeService } from './challenge.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent {

  openChallenges$: Observable<ChallengeOpenDTO[]>;

  constructor(
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.openChallenges$ = this.challengeService.getOpenChallenges();
  }

  joinChallenge(challengeId: string, isOwner: boolean) {
    if (isOwner) {
      this.router.navigate([appRoutes.App, appRoutes.Challenge, challengeId]);
    } else {
      this.challengeService.joinChallenge(challengeId).subscribe(_ => {
        this.router.navigate([appRoutes.App, appRoutes.Challenge, challengeId]);
      });
    }
  }

  cancelChallenge(challengeId: string) {
    this.challengeService.cancelChallenge(challengeId).subscribe(_ => this.openChallenges$ = this.challengeService.getOpenChallenges());
  }

  createNewChallenge() {
    this.dialog.open(ChallengeCreateDialogComponent, {
      data: {
        setEditable: true,
      }
    });
  }

  isEmpty(value: any[]) {
    return value.length === 0;
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
  }
}