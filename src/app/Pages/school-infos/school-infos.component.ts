import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolInfosDTO } from 'src/app/DTOs/SchoolInfosDTO';
import { SchoolInfosService } from './school-infos.service';

@Component({
  selector: 'app-school-infos',
  templateUrl: './school-infos.component.html',
  styleUrls: ['./school-infos.component.scss']
})
export class SchoolInfosComponent {

  schoolInfos$: Observable<SchoolInfosDTO>;
  columns = 3;
  
  constructor(
    private schoolInfosService: SchoolInfosService,
  ) {
    this.schoolInfos$ = this.schoolInfosService.getSchoolInfos();
    this.setColumns();
  }

  @HostListener("window:resize", [])
  onResize() {
    this.setColumns();
  }

  setColumns() {
    if (window.innerWidth > 1360) {
      this.columns = 3;
    } else if (window.innerWidth > 700) {
      this.columns = 2;
    } else {
      this.columns = 1;
    }
  }
}
