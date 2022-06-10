import { Component, OnInit } from '@angular/core';
import { SchoolInfosService } from './school-infos.service';

@Component({
  selector: 'app-school-infos',
  templateUrl: './school-infos.component.html',
  styleUrls: ['./school-infos.component.scss']
})
export class SchoolInfosComponent {

  constructor(
    private service: SchoolInfosService,
  ) { }

}
