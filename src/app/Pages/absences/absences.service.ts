import {Injectable} from '@angular/core';
import {ApiService} from "../../Framework/API/api.service";
import {AbsenceInfoDTO} from "../../DTOs/Absence/AbsenceInfoDTO";
import {Observable} from "rxjs";
import {endpoints} from "../../Config/endpoints";

@Injectable({
    providedIn: 'root'
})
export class AbsencesService {

    constructor(
        private api: ApiService,
    ) { }

    loadAbsences(): Observable<AbsenceInfoDTO[]> {
        return this.api.callApi<AbsenceInfoDTO[]>(endpoints.Absence, {}, "GET");
    }
}
