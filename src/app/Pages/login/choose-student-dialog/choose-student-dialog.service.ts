import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChooseStudentDialogService {

  constructor(
    private api: ApiService,
  ) { }

  getStudents() {
    this.api.callApi<>
  }
}
