import {Injectable} from "@angular/core";
import { Observable, of } from "rxjs";
import { MenuTreeDTO, MenuTreeItemDTO } from "src/app/DTOs/Menu/MenuTreeDTO";

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
                    url: "/app/dashboard",
                    isTeachu: true
                },
                {
                    icon: "info",
                    leave: true,
                    titleTranslationKey: "schoolInfos.schoolInfos",
                    url: "/app/schoolInfos",
                    isTeachu: true
                },
                {
                    icon: "calendar_today",
                    leave: true,
                    titleTranslationKey: "timetable.timetable",
                    url: "/app/timetable",
                    isTeachu: true
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
                    url: "/app/grades",
                    isTeachu: true
                },
                {
                    icon: "not_interested",
                    leave: true,
                    titleTranslationKey: "absences.absences",
                    url: "/app/absences",
                    isTeachu: true
                },
                // {
                //     icon: "chat",
                //     leave: true,
                //     titleTranslationKey: "chat.chat",
                //     url: "/app/chat"
                // },
                {
                    icon: "settings",
                    leave: true,
                    titleTranslationKey: "userSettings.userSettings",
                    url: "/app/userSettings",
                    isTeachu: true
                },
                // {
                //     icon: "school",
                //     leave: false,
                //     translatedTitle: "Classes",
                //     children: [
                //         {
                //             icon: "error",
                //             leave: true,
                //             translatedTitle: "IN19a",
                //             level: 1,
                //             url: "/app/class/IN19a"
                //         },
                //         {
                //             icon: "error",
                //             leave: true,
                //             translatedTitle: "BM19f",
                //             level: 1,
                //             url: "/app/class/BM19f"
                //         }
                //     ]
                // }
                {
                    icon: 'people', leave: false, titleTranslationKey: 'learnz.together', url: '/app/together', isTeachu: false,
                    children: [
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherAsk', url: '/app/together-ask', isTeachu: false },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherChat', url: '/app/together-chat', isTeachu: false },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherConnect', url: '/app/together-connect', isTeachu: false },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherSwipe', url: '/app/together-swipe', isTeachu: false }
                    ]
                },
                { icon: 'public', leave: true, titleTranslationKey: 'learnz.group', url: '/app/group', isTeachu: false },
                { icon: 'build', leave: true, titleTranslationKey: 'learnz.create', url: '/app/create', isTeachu: false },
                { icon: 'school', leave: true, titleTranslationKey: 'learnz.learn', url: '/app/learn', isTeachu: false },
                { icon: 'poll', leave: true, titleTranslationKey: 'learnz.challenge', url: '/app/challenge', isTeachu: false },
                { icon: 'assignment_turned_in', leave: true, titleTranslationKey: 'learnz.test', url: '/app/test', isTeachu: false },
                { icon: 'edit', leave: true, titleTranslationKey: 'learnz.draw', url: '/app/draw', isTeachu: false },
                { icon: 'settings', leave: true, titleTranslationKey: 'learnz.settings', url: '/app/settings', isTeachu: false },
            ] as MenuTreeItemDTO[]
        };
        return of(mockData);
    }
}