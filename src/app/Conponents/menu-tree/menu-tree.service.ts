import {Injectable} from "@angular/core";
import {MenuTreeDTO} from "../../DTOs/MenuTreeDTO";

@Injectable({
    providedIn: 'root'
})
export class MenuTreeService {

    constructor() {
    }

    getMenuTree(): MenuTreeDTO {
        return {
            tree: [
                {
                    icon: "error",
                    leave: true,
                    translatedTitle: "Dashboard",
                    url: "/app/dashboard"
                },
                {
                    icon: "home",
                    leave: false,
                    translatedTitle: "Classes",
                    children: [
                        {
                            icon: "error",
                            leave: true,
                            translatedTitle: "IN19a",
                            url: "/app/class/IN19a"
                        },
                        {
                            icon: "error",
                            leave: true,
                            translatedTitle: "BM19f",
                            url: "/app/class/BM19f"
                        },
                        {
                            icon: "error",
                            leave: true,
                            translatedTitle: "MI21a",
                            url: "/app/class/MI21a"
                        },
                    ]
                },
                {
                    icon: "error",
                    leave: true,
                    translatedTitle: "Coolboard",
                    url: "/app/coolboard"
                },
            ]
        };
    }
}