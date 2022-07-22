import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SemesterDTO} from "../../../DTOs/old_grades/SemesterDTO";
import {ApiService} from "../../../Framework/API/api.service";
import {GradeDTO} from "../../../DTOs/old_grades/GradeDTO";
import {SchoolClassDTO} from "../../../DTOs/old_grades/SchoolClassDTO";
import {SubjectDTO} from "../../../DTOs/old_grades/SubjectDTO";
import {GradeService} from "../../../Conponents/grades/grade.service";
import { MenuTreeDTO, MenuTreeItemDTO } from 'src/app/DTOs/xx_old/MenuTreeDTO';

export interface SubjectData {
    semester: SemesterDTO;
    schoolClass: SchoolClassDTO;
    subject: SubjectDTO;
}

@Component({
    selector: 'app-grades-student-view',
    templateUrl: './grades-student-view.component.html',
    styleUrls: ['./grades-student-view.component.scss']
})
export class GradesStudentViewComponent implements OnInit {
    readonly MENU_BREAKPOINT_PX: number = 720;
    readonly RECENT_EXAMS_AMOUNT: number = 4;

    allSemesterDTOs: SemesterDTO[] = [];
    examMenuTree: MenuTreeDTO = { tree: [] };
    lastExams: GradeDTO[] = [];

    selectedSubject: SubjectData | undefined;
    selectedGrade: GradeDTO | undefined;

    inSmallMode: boolean = false;
    menuOpen: boolean = true;
    currentUIState: "MENU_ONLY" | "CLASS_GRADES_OVERVIEW" | "GRADES_OVERVIEW" = "MENU_ONLY";

    constructor(
        private api: ApiService,
        private grades: GradeService,
    ) { }

    ngOnInit(): void {
        this.onResize();
    }

    @Input() set semesters(semesterDTOs: SemesterDTO[]) {
        this.allSemesterDTOs = semesterDTOs as SemesterDTO[];
        if(!!this.allSemesterDTOs){
            this.examMenuTree = this.grades.generateMenuTree(this.allSemesterDTOs);
            this.lastExams = this.grades.getLastExams(this.allSemesterDTOs, this.RECENT_EXAMS_AMOUNT);
        }
    }

    @HostListener("window:resize", [])
    onResize(): void {
        this.inSmallMode = window.innerWidth <= this.MENU_BREAKPOINT_PX;

        if(!this.inSmallMode)
            this.menuOpen = true;
        else if(this.selectedGrade !== undefined || this.selectedSubject !== undefined)
            this.menuOpen = false;

        this.updateUiState();
    }

    recentExamClicked(grade: GradeDTO): void {
        this.selectedGrade = grade;
        if(this.inSmallMode){
            this.menuOpen = false;
        }

        this.updateUiState();
    }

    menuTreeLeaveClicked(treeItem: MenuTreeItemDTO): void{
        if(this.inSmallMode){
            this.menuOpen = false;
        }
        this.selectedSubject = treeItem.data as SubjectData;
        this.selectedGrade = undefined;

        this.updateUiState();
    }

    gradeSelected(grade: GradeDTO): void {
        this.selectedGrade = grade;
        this.updateUiState();
    }

    openMenu(): void {
        this.menuOpen = true;
        this.updateUiState();
    }

    closeGradeDetails(): void {
        this.selectedGrade = undefined;

        this.updateUiState();
    }

    getGridClass(): string {
        return this.currentUIState === "MENU_ONLY" ? "student-content-collapsed" : "student-content";
    }

    getMenuTreeDisplay(): string {
        return this.currentUIState === "MENU_ONLY" || this.menuOpen ? "inherit" : "none";
    }

    getClassGradesDisplay(): string {
        return this.currentUIState === "CLASS_GRADES_OVERVIEW" ? "inherit" : "none";
    }

    getGradesDisplay(): string {
        return this.currentUIState === "GRADES_OVERVIEW" ? "inherit" : "none";
    }

    private updateUiState(): void {
        if((this.selectedSubject === undefined && this.selectedGrade === undefined) || (this.inSmallMode && this.menuOpen)){
            this.currentUIState = "MENU_ONLY";
        }else if(this.selectedSubject !== undefined && this.selectedGrade === undefined){
            this.currentUIState = "CLASS_GRADES_OVERVIEW";
        }else if(this.selectedGrade !== undefined){
            this.currentUIState = "GRADES_OVERVIEW";
        }
    }

}
