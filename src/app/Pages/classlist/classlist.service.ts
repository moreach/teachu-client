import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
    // todo warte bis de endpunkt gflickt isch
    const mock = {
      name: 'BM19c',
      classTeacher: {
        firstName: 'Sylvie',
        lastName: 'Bonaparte',
      },
      students: [
        {
          firstName: 'Eric',
          lastName: 'Wermelinger',
          birthday: new Date(),
          city: 'Zürich',
          email: 'abc@def.ch',
          role: 'student',
          sex: 'male',
          imageId: '123'
        },
        {
          firstName: 'Eric',
          lastName: 'Wermelinger',
          birthday: new Date(),
          city: 'Zürich',
          email: 'abc@def.ch',
          role: 'student',
          sex: 'male',
          imageId: '123'
        },
      ],
      teachers: [
        {
          firstName: 'Eric',
          lastName: 'Wermelinger',
          birthday: new Date(),
          city: 'Zürich',
          email: 'abc@def.ch',
          role: 'student',
          sex: 'male',
          imageId: '123'
        },
        {
          firstName: 'Eric',
          lastName: 'Wermelinger',
          birthday: new Date(),
          city: 'Zürich',
          email: 'abc@def.ch',
          role: 'student',
          sex: 'male',
          imageId: '123'
        },
      ]
    } as ClassListDTO;
    return of(mock);
    // return this.api.callApi<ClassListDTO>(endpoints.ClassList, { }, 'GET');
  }
}