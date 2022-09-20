import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestResultOverviewDTO } from 'src/app/DTOs/Test/TestResultOverviewDTO';
import { formatTime } from 'src/app/Framework/Helpers/StringHelpers';
import { TestResultOverviewService } from './test-result-overview.service';

@Component({
  selector: 'app-test-result-overview',
  templateUrl: './test-result-overview.component.html',
  styleUrls: ['./test-result-overview.component.scss']
})
export class TestResultOverviewComponent {

  resultOverview$: Observable<TestResultOverviewDTO>;
  testId: string;
  formControlVisible: FormControl;

  constructor(
    private resultOverviewService: TestResultOverviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.formControlVisible = new FormControl(false);
    this.testId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TestId) ?? '';
    this.resultOverview$ = this.resultOverviewService.getResultOverview$(this.testId);
    this.resultOverview$.subscribe(result => {
      this.formControlVisible.setValue(result.visible);
    });
  }

  openDetails(testOfUserId: string, userId: string) {
    this.router.navigate([appRoutes.App, appRoutes.Test, appRoutes.TestResult, testOfUserId, userId]);
  }

  calculatePercentage(value: number, total: number) {
    if (total === 0) {
      return 0;
    }
    return Math.round(value / total * 100 * 100) / 100;
  }

  formatTime(minutes: number) {
    return formatTime(minutes);
  }

  changeVisibility(visible: MatSlideToggleChange) {
    this.resultOverviewService.changeVisibility$(this.testId, visible.checked);
  }
}