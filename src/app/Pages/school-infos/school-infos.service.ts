import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SchoolInfoDTO } from 'src/app/DTOs/SchoolInfoDTO';
import { SchoolInfosDTO } from 'src/app/DTOs/SchoolInfosDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolInfosService {

  constructor(
    private api: ApiService,
  ) { }

  getSchoolInfos() {
    const mockSchoolInfo = {
      creatorName: 'Rolf Hähner',
      date: new Date(2020, 1, 1),
      important: true,
      pinned: true,
      title: 'Schulinfo',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      image: 'https://www.w3schools.com/howto/img_avatar.png',
    } as SchoolInfoDTO;
    const mockData = {
      schoolInfos: [
        {
          ...mockSchoolInfo
        }, {
          ...mockSchoolInfo,
          pinned: true,
          important: false,
        }, {
          ...mockSchoolInfo,
          pinned: false,
        }, {
          ...mockSchoolInfo,
          pinned: false,
          important: false,
          text: mockSchoolInfo.text + mockSchoolInfo.text,
        }, {
          ...mockSchoolInfo,
          pinned: false,
          important: false,
          image: null,
        }, {
          ...mockSchoolInfo,
          pinned: false,
          important: false,
        }, {
          ...mockSchoolInfo,
          pinned: false,
          text: mockSchoolInfo.text + mockSchoolInfo.text,
        }, {
          ...mockSchoolInfo,
          pinned: false,
          important: false,
        }
      ]
    } as SchoolInfosDTO;
    return of(mockData);
  }
}
