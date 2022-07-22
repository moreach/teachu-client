import {Injectable} from "@angular/core";
import { Observable, of } from "rxjs";
import { MenuTreeDTO } from "src/app/DTOs/xx_old/MenuTreeDTO";

@Injectable({
    providedIn: 'root'
})
export class MenuTreeService {

    constructor() {
    }

    getMenuTree$(): Observable<MenuTreeDTO> {
        // todo replace with backend endpoint
        const mockData = {
            tree: [
                {
                    icon: "home",
                    leave: true,
                    titleTranslationKey: "dashboard.dashboard",
                    url: "/app/dashboard"
                },
                {
                    icon: "info",
                    leave: true,
                    titleTranslationKey: "schoolInfos.schoolInfos",
                    url: "/app/schoolInfos"
                },
                {
                    icon: "calendar_today",
                    leave: true,
                    titleTranslationKey: "timetable.timetable",
                    url: "/app/timetable"
                },
                {
                    icon: "list",
                    leave: true,
                    titleTranslationKey: "classlist.classlist",
                    url: "/app/classlist",
                },
                {
                    icon: "grade",
                    leave: true,
                    titleTranslationKey: "grades.grades",
                    url: "/app/grades"
                },
                {
                    icon: "not_interested",
                    leave: true,
                    titleTranslationKey: "absences.absences",
                    url: "/app/absences"
                },
                {
                    icon: "chat",
                    leave: true,
                    titleTranslationKey: "chat.chat",
                    url: "/app/chat"
                },
                {
                    icon: "settings",
                    leave: true,
                    titleTranslationKey: "userSettings.userSettings",
                    url: "/app/userSettings"
                },
                {
                    icon: "school",
                    leave: false,
                    translatedTitle: "Classes",
                    children: [
                        {
                            icon: "error",
                            leave: true,
                            translatedTitle: "IN19a",
                            level: 1,
                            url: "/app/class/IN19a"
                        },
                        {
                            icon: "error",
                            leave: true,
                            translatedTitle: "BM19f",
                            level: 1,
                            url: "/app/class/BM19f"
                        }
                    ]
                }
            ]
        };
        return of(mockData);
    }
}