import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { SchoolInfoDTO } from 'src/app/DTOs/SchoolInfo/SchoolInfoDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolInfosService {

  constructor(
    private api: ApiService,
  ) { }

  getSchoolInfos() {
    return this.api.callApi<SchoolInfoDTO[]>(endpoints.SchoolInfo, {}, 'GET');
  }
}
