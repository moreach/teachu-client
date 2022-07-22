import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassListDTO } from 'src/app/DTOs/xx_old/ClassListDTO';
import { ClasslistService } from './classlist.service';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.scss']
})
export class ClasslistComponent {

  classList$: Observable<ClassListDTO>;

  constructor(
    private classListService: ClasslistService,
  ) { 
    this.classList$ = this.classListService.getClasslist();
  }

}
