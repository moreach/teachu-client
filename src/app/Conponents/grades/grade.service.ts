import { Injectable } from '@angular/core';
import { MenuTreeDTO, MenuTreeItemDTO } from 'src/app/DTOs/Menu/MenuTreeDTO';
import {GradeDTO, GradeSemesterDTO} from "../../DTOs/Grade/GradeDTOs";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
    readonly SEMESTER_ICON: string = "home";
    readonly CLASS_ICON: string = "error";
    readonly SUBJECT_ICON: string = "error";

    getLastExams(semesters: GradeSemesterDTO[], amount?: number | undefined): GradeDTO[]{
        let exams: GradeDTO[] = [];
        for (let semester of semesters) {
            for (let schoolClass of semester.classes) {
                for (let subject of schoolClass.subjects) {
                    for (let grade of subject.grades) {
                        exams.push(grade);
                    }
                }
            }
        }

        exams.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        amount = amount || exams.length;
        return exams.slice(0, amount);
    }

    generateMenuTree(semesters: GradeSemesterDTO[]): MenuTreeDTO {
        let menuTreeItems: MenuTreeItemDTO[] = [];

        for (let semester of semesters) {
            let semesterLeave: MenuTreeItemDTO = {
                icon: this.SEMESTER_ICON,
                leave: false,
                translatedTitle: semester.name,
                children: []
            };

            for (let schoolClass of semester.classes) {
                let schoolClassLeave: MenuTreeItemDTO = {
                    icon: this.CLASS_ICON,
                    leave: false,
                    translatedTitle: schoolClass.name,
                    children: []
                };

                for (let subject of schoolClass.subjects) {
                    let subjectLeave: MenuTreeItemDTO = {
                        icon: this.SUBJECT_ICON,
                        leave: true,
                        translatedTitle: subject.name,
                        data: { semester, schoolClass, subject }
                    };
                    schoolClassLeave.children!.push(subjectLeave);
                }
                semesterLeave.children!.push(schoolClassLeave);
            }
            menuTreeItems.push(semesterLeave);
        }

        return { tree: menuTreeItems }
    }
}
