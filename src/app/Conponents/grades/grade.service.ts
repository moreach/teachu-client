import { Injectable } from '@angular/core';
import {SemesterDTO} from "../../DTOs/grades/SemesterDTO";
import {GradeDTO} from "../../DTOs/grades/GradeDTO";
import {MenuTreeDTO, MenuTreeItemDTO} from "../../DTOs/MenuTreeDTO";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
    readonly SEMESTER_ICON: string = "home";
    readonly CLASS_ICON: string = "error";
    readonly SUBJECT_ICON: string = "error";

    getClassAveragesAsString(semester: SemesterDTO): Map<string, number> {
        let classAverages: Map<string, number> = new Map<string, number>();

        for (let schoolClass of semester.schoolClasses) {
            classAverages.set(schoolClass.schoolClass, Math.round(schoolClass.averageMark * 100) / 100);
        }

        return classAverages;
    }

    getLastExams(semesters: SemesterDTO[], amount?: number | undefined): GradeDTO[]{
        let exams: GradeDTO[] = [];
        for (let semester of semesters) {
            for (let schoolClass of semester.schoolClasses) {
                for (let subject of schoolClass.subjects) {
                    for (let grade of subject.grades) {
                        exams.push(grade);
                    }
                }
            }
        }

        exams.sort((a, b) => b.date - a.date);
        amount = amount || exams.length;
        return exams.slice(0, amount);
    }

    generateMenuTree(semesters: SemesterDTO[]): MenuTreeDTO {
        let menuTreeItems: MenuTreeItemDTO[] = [];

        for (let semester of semesters) {
            let semesterLeave: MenuTreeItemDTO = {
                icon: this.SEMESTER_ICON,
                leave: false,
                translatedTitle: semester.semesterName,
                children: []
            };

            for (let schoolClass of semester.schoolClasses) {
                let schoolClassLeave: MenuTreeItemDTO = {
                    icon: this.CLASS_ICON,
                    leave: false,
                    translatedTitle: schoolClass.schoolClass,
                    children: []
                };

                for (let subject of schoolClass.subjects) {
                    let subjectLeave: MenuTreeItemDTO = {
                        icon: this.SUBJECT_ICON,
                        leave: true,
                        translatedTitle: subject.subjectName,
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
