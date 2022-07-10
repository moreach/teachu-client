import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ClassListDTO } from 'src/app/DTOs/ClassListDTO';
import { ClassListStudentDTO } from 'src/app/DTOs/ClassListStudentDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClasslistService {

  constructor(
    private api: ApiService,
  ) { }

  getClasslist() {
    // todo implement endpoint from backend
    const mockStudent = {
      birthday: new Date(2003, 1, 1),
      city: 'Hanoi',
      firstName: 'Eric',
      lastName: 'Wermelinger',
      nameParent1: 'Parent1',
      nameParent2: 'Parent2',
      phone: '01234556789',
      phoneParent1: '01234556789',
      phoneParent2: '01234556789',
      postalCode: '12345',
      profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
      sex: 'MALE',
      street: 'Langstrasse 1',
    } as ClassListStudentDTO;
    const mockData = {
      classes: [
        {
          className: 'BM19c',
          teacherName: 'Sylvie Bonaparte',
          students: [
            {
              ...mockStudent
            }, {
              ...mockStudent,
              firstName: 'Oliver',
              lastName: 'Umbricht',
            }, {
              ...mockStudent,
              firstName: 'Roman',
              lastName: 'Bürge',
            }
          ]
        }, {
          className: 'BM19f',
          teacherName: 'Roberto Formisano',
          students: [
            {
              ...mockStudent,
              firstName: 'Micha',
              lastName: 'Schweizer',
            }, {
              ...mockStudent,
              firstName: 'Jonas',
              lastName: 'Hauser',
            }
          ]
        }
      ],
      teachers: [
        {
          ...mockStudent,
          firstName: 'Sylvie',
          lastName: 'Bonaparte',
        }, {
          ...mockStudent,
          firstName: 'Roberto',
          lastName: 'Formisano',
        }
      ]
    } as ClassListDTO;
    return of(mockData);
    // return this.api.callApi<ClassListDTO>(endpoints.ClassList, {}, 'GET');
  }
}
