import {Injectable} from '@angular/core';
import {endpoints} from "../../Config/endpoints";
import {ParentChildDTO} from "../../DTOs/User/ParentChildDTO";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {appConfig} from "../../Config/appConfig";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ParentService implements HttpInterceptor{

    private children: ParentChildDTO[] | undefined;
    private endpointsWithStudentId: string[] = [
        endpoints.ClassList,
        endpoints.Grade,
        endpoints.Timetable,
        endpoints.Absence,
    ];

    constructor(
        private api: ApiService,
    ) { }

    callParentEndpoint$() {
        return this.api.callApi<ParentChildDTO[]>(endpoints.Parent, {}, 'GET');
    }

    setActiveStudent(childrenId: string) {
        localStorage.setItem(appConfig.APPLICATION_SELECTED_STUDENT, childrenId);
    }

    selectAStudent(){
        const savedId = localStorage.getItem(appConfig.APPLICATION_SELECTED_STUDENT);
        if(!savedId)
            this.getChildren().then(children => this.setActiveStudent(children[0].id));
    }

    getChildById(id: string): Promise<ParentChildDTO> {
        return new Promise<ParentChildDTO>((resolve, reject) => {
            this.getChildren().then(children => {
                const foundChild: ParentChildDTO | undefined = children.find(c => c.id === id);
                if(foundChild) resolve(foundChild);
                else reject("no child with given id found");
            });
        });
    }

    getChildren(): Promise<ParentChildDTO[]>{
        return new Promise<ParentChildDTO[]>(resolve => {
            if(this.children) resolve(this.children);
            else {
                this.callParentEndpoint$().subscribe(children => {
                    this.children = children;
                    resolve(children);
                });
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;

        const studentId = this.getSelectedStudentIdIfRequired(req.url);
        if(!!studentId){
            newReq = req.clone({
                setParams: { "studentId": studentId },
            });
            if(!environment.IS_PROD) console.log("interceptor - updated request params", newReq.params);
        }

        return next.handle(newReq);
    }

    private getSelectedStudentIdIfRequired(url: string): string | null {
        let endpoint = url.replace(environment.URL_API, "");
        if(endpoint.includes("/"))
            endpoint = endpoint.substring(0, endpoint.indexOf("/"));

        if(this.endpointsWithStudentId.includes(endpoint)){
            const studentId = localStorage.getItem(appConfig.APPLICATION_SELECTED_STUDENT);
            return !!studentId ? studentId : null;
        }
        return null;
    }
}
