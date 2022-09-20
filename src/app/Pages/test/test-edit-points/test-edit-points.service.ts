import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { TestAdjustUserPointDTO } from 'src/app/DTOs/Test/TestAdjustUserPointDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class TestEditPointsService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  adjustUserPoints$(value: TestAdjustUserPointDTO) {
    return this.api.callApi(endpoints.TestGroupAdjustUserPoints, value, 'POST');
  }
}
