import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { ClassListDTO } from 'src/app/DTOs/ClassList/ClassListDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClasslistService {

  constructor(
    private api: ApiService,
  ) { }

  getClasslist() {
    return this.api.callApi<ClassListDTO[]>(endpoints.ClassList, { }, 'GET');
  }
}