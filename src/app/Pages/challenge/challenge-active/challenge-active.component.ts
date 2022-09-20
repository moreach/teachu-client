import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, distinctUntilChanged, filter, interval, map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChallengeActiveDTO } from 'src/app/DTOs/Challenge/ChallengeActiveDTO';
import { ChallengeIdDTO } from 'src/app/DTOs/Challenge/ChallengeIdDTO';
import { ChallengePlayerResultDTO } from 'src/app/DTOs/Challenge/ChallengePlayerResultDTO';
import { GeneralQuestionAnswerDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionAnswerDTO';
import { getChallengeStates } from 'src/app/DTOs/Enums/ChallengeState';
import { ChallengeCancelledDialogComponent } from '../challenge-cancelled-dialog/challenge-cancelled-dialog.component';
import { ChallengeActiveService } from './challenge-active.service';

@Component({
  selector: 'app-challenge-active',
  templateUrl: './challenge-active.component.html',
  styleUrls: ['./challenge-active.component.scss']
})
export class ChallengeActiveComponent implements OnDestroy {

  challengeId: string;
  challenge$: Observable<ChallengeActiveDTO>;
  heartBeat$: Observable<boolean>;
  private destroyed$ = new Subject<void>();

  constructor(
    private challengeActiveService: ChallengeActiveService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.challengeId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChallengeId) ?? '';
    this.challenge$ = this.challengeActiveService.getActiveChallenge(this.challengeId).pipe(takeUntil(this.destroyed$));
    const cancelled$ = this.challenge$.pipe(map(chl => chl.cancelled), filter(cnc => cnc === true));
    cancelled$.subscribe(_ => this.showCancelDialog());
    this.heartBeat$ = merge(
      interval(1000).pipe(takeUntil(this.destroyed$)),
      this.challenge$,
    ).pipe(map(_ => true));
  }

  challengeNextFlow() {
    this.challengeActiveService.challengeNextFlow({ challengeId: this.challengeId } as ChallengeIdDTO);
  }

  challengeAnswer(value: GeneralQuestionAnswerDTO) {
    this.challengeActiveService.challengeAnswer(value);
  }

  showCancelDialog() {
    const dialog$ = this.dialog.open(ChallengeCancelledDialogComponent, { });
    dialog$.afterClosed().subscribe(_ => this.router.navigate([appRoutes.App, appRoutes.Challenge]));
  }

  wasRight(points: number) {
    return points > 0;
  }

  getPlace(user: ChallengePlayerResultDTO, results: ChallengePlayerResultDTO[]) {
    return results.findIndex(r => r.username === user.username && r.points === user.points) + 1;
  }

  secondsLeft(date: Date | null, isOwner: boolean) {
    if (date === null) {
      return 0;
    }
    const timeLeft = Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000);
    const result = timeLeft > 0 ? timeLeft : 0;
    if (isOwner && result === 0) {
      this.challengeNextFlow();
    }
    return result;
  }

  getState(state: number) {
    return getChallengeStates().filter(s => s.value === state)[0].key;
  }

  getLength(arr: any[]) {
    return arr.length;
  }

  goBack() {
    this.router.navigate([appRoutes.App, appRoutes.Challenge]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}