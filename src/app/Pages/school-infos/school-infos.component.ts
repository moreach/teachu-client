import { Component, HostListener } from '@angular/core';
import {map, Observable} from 'rxjs';
import { SchoolInfoDTO } from 'src/app/DTOs/SchoolInfo/SchoolInfoDTO';
import { SchoolInfosService } from './school-infos.service';

@Component({
  selector: 'app-school-infos',
  templateUrl: './school-infos.component.html',
  styleUrls: ['./school-infos.component.scss']
})
export class SchoolInfosComponent {

  schoolInfos$: Observable<SchoolInfoDTO[]>;

  constructor(
    private schoolInfosService: SchoolInfosService,
  ) {
    this.schoolInfos$ = this.schoolInfosService.getSchoolInfos().pipe(
      map(info => info.sort((a, b) => (a.pinned === b.pinned)? 0 : a.pinned? -1 : 1))
    );
  }
}
