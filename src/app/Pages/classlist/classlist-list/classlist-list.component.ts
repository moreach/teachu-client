import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassListClassDTO } from 'src/app/DTOs/ClassListClassDTO';
import { ClassListStudentDTO } from 'src/app/DTOs/ClassListStudentDTO';
import { ClassListTeacherDTO } from 'src/app/DTOs/ClassListTeacherDTO';
import { ClasslistDetailComponent } from '../classlist-detail/classlist-detail.component';

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html',
  styleUrls: ['./classlist-list.component.scss']
})
export class ClasslistListComponent {

  _class: ClassListClassDTO | undefined = undefined;
  _students: ClassListStudentDTO[] = [];
  _teachers: ClassListTeacherDTO[] = [];
  isReversed: boolean = false;
  sortKey: string = '';
  @Input() set class(c: ClassListClassDTO) {
    this._class = c;
    this._students = c.students;
  }
  @Input() set teachers(t: ClassListTeacherDTO[]) {
    this._teachers = t;
  }
  @Input() isTeacher: boolean = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  getData(): ClassListStudentDTO[] | ClassListTeacherDTO[] {
    return this.isTeacher ? this._teachers : this._students;
  }

  sortBasis() {
    const data = this.getData();
    data.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });
    return data;
  }

  sortBy(key: string) {
    this.isReversed = this.sortKey === key ? !this.isReversed : false;
    this.sortKey = key;
    const multiplier = this.isReversed ? -1 : 1;
    const data = this.sortBasis();
    data.sort((a, b) => {
      if ((a as any)[key] < (b as any)[key]) {
        return -1 * multiplier;
      }
      if ((a as any)[key] > (b as any)[key]) {
        return 1 * multiplier;
      }
      return 0;
    });
    return data;
  }

  openDetail(person: ClassListStudentDTO | ClassListTeacherDTO, isTeacher: boolean) {
    this.dialog.open(ClasslistDetailComponent, {
      data: {
        person,
        isTeacher
      },
      width: '400px',
    });
  }
}
