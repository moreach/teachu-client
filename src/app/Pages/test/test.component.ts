import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestDTO } from 'src/app/DTOs/Test/TestDTO';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { formatTime } from 'src/app/Framework/Helpers/StringHelpers';
import { TestCreateDialogComponent } from './test-create-dialog/test-create-dialog.component';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  openTests$: Observable<TestDTO[]>;
  closedTests$: Observable<TestDTO[]>;

  constructor(
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.openTests$ = this.testService.openTests$();
    this.closedTests$ = this.testService.closedTests$();
  }

  createNewTest() {
    const dialogRef = this.dialog.open(TestCreateDialogComponent, {
      data: {
        setEditable: true,
      }
    });
    dialogRef.afterClosed().subscribe(_ => this.openTests$ = this.testService.openTests$());
  }

  openStepper(testId: string, testOfUserId: string | null, isOwner: boolean, isGroupTest: boolean) {
    if (isOwner && isGroupTest) {
      this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestSetting, testId]);
    } else if (testOfUserId != null) {
      this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestStepper, testOfUserId]);
    } else {
      this.testService.testStart$(testId).subscribe(testIdDto => {
        this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestStepper, testIdDto.testId]);
      });
    }
  }

  openResult(testId: string, testOfUserId: string | null) {
    if (testOfUserId != null) {
      this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestResult, testOfUserId]);
    } else {
      this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestResultOverview, testId]);
    }
  }

  calculatePercentage(value: TestDTO) {
    if (!value.pointsScored) {
      return null;
    }
    const points = value.pointsScored ?? 0;
    const total = value.pointsPossible ?? 0;
    if (total == 0) {
      return 0;
    }
    return Math.round(points / total * 100 * 100) / 100;
  }

  isEmpty(value: any[]) {
    return value.length === 0;
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
  }

  formatTime(minutes: number) {
    return formatTime(minutes);
  }
}
