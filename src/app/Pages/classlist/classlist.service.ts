import {Injectable} from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { ClassListDTO } from 'src/app/DTOs/ClassList/ClassListDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClasslistService {

    private readonly classList: Observable<ClassListDTO[]> | undefined;

    constructor(
        private api: ApiService,
    ) {
        this.classList = this.api.callApi<ClassListDTO[]>(endpoints.ClassList, { }, 'GET');
    }

    getClasses$(): Observable<ClassListDTO[]> {
        return this.classList!;
    }

    getClass$(name: string): Observable<ClassListDTO>{
        return new Observable<ClassListDTO>(obs => {
            this.classList!.subscribe(list => obs.next(list.find(c => name === c.name)));
        });
    }
}