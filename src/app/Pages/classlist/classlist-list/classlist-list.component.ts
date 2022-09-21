import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassListStudentDTO, ClassListTeacherDTO } from 'src/app/DTOs/ClassList/ClassListDTO';
import { ClassListDetailDialogComponent } from '../classlist-detail/class-list-detail-dialog.component';

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html',
  styleUrls: ['./classlist-list.component.scss']
})
export class ClasslistListComponent {

  _people: ClassListStudentDTO[] | ClassListTeacherDTO[] = [];
  @Input() set people (p: ClassListStudentDTO[] | ClassListTeacherDTO[]){
    this._people = this.sortBasis(p);
  };

  @Input() isTeacher: boolean = false;
  @Input() className: string = '';
  @Input() teacherName: string = '';

  isReversed: boolean = false;
  sortKey: string = '';

  constructor(
    private dialog: MatDialog,
  ) { }

  getSortState(key: string): boolean | undefined {
      if(key !== this.sortKey) return undefined;
      return !this.isReversed;
  }

  sortBasis(p: ClassListStudentDTO[] | ClassListTeacherDTO[]) {
    p.sort((a, b) => {
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
    return p;
  }

  sortBy(key: string) {
    this.isReversed = this.sortKey === key ? !this.isReversed : false;
    this.sortKey = key;
    const multiplier = this.isReversed ? -1 : 1;
    const data = this._people;
    data.sort((a, b) => {
      if ((a as any)[key] < (b as any)[key]) {
        return -1 * multiplier;
      }
      if ((a as any)[key] > (b as any)[key]) {
        return 1 * multiplier;
      }
      return 0;
    });
    this._people = data;
  }

  openDetail(person: ClassListStudentDTO | ClassListTeacherDTO) {
    this.dialog.open(ClassListDetailDialogComponent, {
      data: {
        person
      },
      width: '400px',
    });
  }
}
