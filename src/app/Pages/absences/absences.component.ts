import { Component } from '@angular/core';
import { AbsencesService } from './absences.service';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent {

  constructor(
    private absencesService: AbsencesService,
  ) { }

}
