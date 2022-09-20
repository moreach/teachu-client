import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { GroupInfoCreateDTO } from 'src/app/DTOs/Group/GroupInfoCreateDTO';
import { GroupInfoDTO } from 'src/app/DTOs/Group/GroupInfoDTO';
import { GroupLeaveDTO } from 'src/app/DTOs/Group/GroupLeaveDTO';
import { GroupPossibleUserDTO } from 'src/app/DTOs/Group/GroupPossibleUserDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class GroupInfoDialogService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getGroupInfo(groupId: string): Observable<GroupInfoDTO> {
    return this.api.callApi<GroupInfoDTO>(endpoints.GroupInfo, { groupId }, 'GET');
  }

  getPossibleUsers(): Observable<GroupPossibleUserDTO[]> {
    return this.api.callApi<GroupPossibleUserDTO[]>(endpoints.GroupPossibleUsers, {}, 'GET');
  }

  upsertGroup(group: GroupInfoCreateDTO) {
    return this.api.callApi(endpoints.GroupInfo, group, 'POST');
  }

  leaveGroup(group: GroupLeaveDTO) {
    return this.api.callApi(endpoints.GroupLeave, group, 'POST');
  }
}
