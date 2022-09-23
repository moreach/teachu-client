import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {MenuTreeDTO, MenuTreeItemDTO} from "src/app/DTOs/Menu/MenuTreeDTO";
import {ClasslistService} from "../../Pages/classlist/classlist.service";
import {appRoutes} from "../../Config/appRoutes";

@Injectable({
    providedIn: 'root'
})
export class MenuTreeService {

    private finalTree: boolean = false;

    constructor(
        private classListService: ClasslistService,
    ) {
    }

    getMenuTree$(): Observable<MenuTreeDTO> {
        let menuTree: MenuTreeDTO = {
            tree: [
                {
                    icon: "home",
                    leave: true,
                    titleTranslationKey: "dashboard.dashboard",
                    url: "/app/dashboard",
                },
                {
                    icon: "info",
                    leave: true,
                    titleTranslationKey: "schoolInfos.schoolInfos",
                    url: "/app/schoolInfos",
                },
                {
                    icon: "calendar_today",
                    leave: true,
                    titleTranslationKey: "timetable.timetable",
                    url: "/app/timetable",
                },
                {
                    icon: "grade",
                    leave: true,
                    titleTranslationKey: "grades.grades",
                    url: "/app/grades",
                },
                {
                    icon: "not_interested",
                    leave: true,
                    titleTranslationKey: "absences.absences",
                    url: "/app/absences",
                },
                {
                    icon: "chat",
                    leave: true,
                    titleTranslationKey: "chat.chat",
                    url: "/app/chat"
                },
                {
                    icon: 'people', leave: false, titleTranslationKey: 'learnz.together', url: '/app/together',
                    children: [
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherAsk', url: '/app/together-ask' },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherChat', url: '/app/together-chat' },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherConnect', url: '/app/together-connect' },
                        { icon: '', leave: true, level: 1, titleTranslationKey: 'learnz.togetherSwipe', url: '/app/together-swipe' }
                    ]
                },
                { icon: 'public', leave: true, titleTranslationKey: 'learnz.group', url: '/app/group' },
                { icon: 'build', leave: true, titleTranslationKey: 'learnz.create', url: '/app/create' },
                { icon: 'school', leave: true, titleTranslationKey: 'learnz.learn', url: '/app/learn' },
                { icon: 'poll', leave: true, titleTranslationKey: 'learnz.challenge', url: '/app/challenge' },
                { icon: 'assignment_turned_in', leave: true, titleTranslationKey: 'learnz.test', url: '/app/test' },
                { icon: 'edit', leave: true, titleTranslationKey: 'learnz.draw', url: '/app/draw' },
                {
                    icon: "settings",
                    leave: true,
                    titleTranslationKey: "userSettings.userSettings",
                    url: "/app/userSettings"
                }
            ]
        };
        return new Observable<MenuTreeDTO>(obs => {
            obs.next(menuTree);
            if(!this.finalTree){
                this.getSchoolClasses().subscribe(classes => {
                    menuTree.tree.push(classes);
                    this.finalTree = true;
                    obs.next(menuTree);
                });
            }
        });
    }

    private getSchoolClasses(): Observable<MenuTreeItemDTO>{
        return new Observable<MenuTreeItemDTO>(obs => {
            this.classListService.getClasses$().subscribe(classes => {
                obs.next({
                    icon: "school",
                    leave: false,
                    translatedTitle: "Classes",
                    children: classes.map(clazz => ({
                        icon: "local_library",
                        leave: true,
                        translatedTitle: clazz.name,
                        level: 1,
                        url: `${appRoutes.App}/${appRoutes.Class}/${clazz.name}`
                    }) as MenuTreeItemDTO),
                })
            });
        });
    }
}
