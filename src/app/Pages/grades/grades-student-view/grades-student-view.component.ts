import {Component, OnInit} from '@angular/core';
import {SemesterDTO} from "../../../DTOs/grades/SemesterDTO";
import {ApiService} from "../../../Framework/API/api.service";
import {endpoints} from "../../../Config/endpoints";
import {MenuTreeDTO, MenuTreeItemDTO} from "../../../DTOs/MenuTreeDTO";
import {GradeDTO} from "../../../DTOs/grades/GradeDTO";

@Component({
    selector: 'app-grades-student-view',
    templateUrl: './grades-student-view.component.html',
    styleUrls: ['./grades-student-view.component.scss']
})
export class GradesStudentViewComponent implements OnInit {
    readonly RECENT_EXAMS_AMOUNT: number = 4;
    readonly SEMESTER_ICON: string = "home";
    readonly CLASS_ICON: string = "error";

    allSemesterDTOs: SemesterDTO[] = [];
    examMenuTree: MenuTreeDTO = { tree: [] };
    lastExams: GradeDTO[] = [];
    classSelected: boolean = false;


    constructor(
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.api.callApi<any>(endpoints.studentGrade, {}, 'GET')
            .subscribe(request => {
                this.allSemesterDTOs = request.semesters as SemesterDTO[];
                console.log(this.allSemesterDTOs)
                this.examMenuTree = this.generateMenuTree(this.allSemesterDTOs);
                this.lastExams = this.getLastExams(this.allSemesterDTOs, this.RECENT_EXAMS_AMOUNT);
            });
    }

    menuTreeLeaveClicked(treeItem: MenuTreeItemDTO){
        console.log(treeItem);
        this.classSelected = true;
    }

    getDateString(date: number): string {
       return new Date(date).toLocaleDateString();
    }

    private getLastExams(semesters: SemesterDTO[], amount?: number | undefined): GradeDTO[]{
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
        console.log(exams[0]);
        return exams.slice(0, amount);
    }

    private generateMenuTree(semesters: SemesterDTO[]): MenuTreeDTO {
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
                        icon: this.CLASS_ICON,
                        leave: true,
                        translatedTitle: subject.subjectName
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
