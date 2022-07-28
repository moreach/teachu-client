import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "../user-settings/user.service";
import {endpoints} from "../../Config/endpoints";
import {ApiService} from "../../Framework/API/api.service";
import {GradeDTO, GradeSemesterDTO, SubjectData} from "../../DTOs/Grade/GradeDTOs";
import {MenuTreeDTO, MenuTreeItemDTO} from "../../DTOs/Menu/MenuTreeDTO";
import {GradeService} from "../../Conponents/grades/grade.service";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
    readonly MENU_BREAKPOINT_PX: number = 720;
    readonly RECENT_EXAMS_AMOUNT: number = 4;

    allSemesterDTOs: GradeSemesterDTO[] = [];
    examMenuTree: MenuTreeDTO = { tree: [] };
    lastExams: GradeDTO[] = [];

    selectedSubject: SubjectData | undefined;
    selectedGrade: GradeDTO | undefined;

    inSmallMode: boolean = false;
    menuOpen: boolean = true;
    currentUIState: "MENU_ONLY" | "CLASS_GRADES_OVERVIEW" | "GRADES_OVERVIEW" = "MENU_ONLY";

    constructor(
        private userService: UserService,
        private gradeService: GradeService,
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.onResize();
        this.api.callApi<GradeSemesterDTO[]>(endpoints.Grade, {}, 'GET')
            .subscribe((grades) => this.grades = grades);
    }

    set grades(gradeDTO: GradeSemesterDTO[]) {
        this.allSemesterDTOs = gradeDTO as GradeSemesterDTO[];
        if(!!this.allSemesterDTOs && this.allSemesterDTOs.length > 0){
            this.examMenuTree = this.gradeService.generateMenuTree(this.allSemesterDTOs);
            this.lastExams = this.gradeService.getLastExams(this.allSemesterDTOs, this.RECENT_EXAMS_AMOUNT);
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
