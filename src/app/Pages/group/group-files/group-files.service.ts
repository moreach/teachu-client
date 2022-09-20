import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { FileFrontendHistorizedDTO } from 'src/app/DTOs/File/FileFrontendHistorizedDTO';
import { GroupFileChangeDTO } from 'src/app/DTOs/Group/GroupFileChangeDTO';
import { ApiExtensionService, HttpMethods } from 'src/app/Framework/API/api-extension.service';
import { WebSocketService } from 'src/app/Framework/API/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GroupFilesService {

  constructor(
    private api: ApiExtensionService,
    private ws: WebSocketService,
  ) { }

  getFiles(groupId: string): Observable<FileFrontendHistorizedDTO[]> {
    return merge(
      this.api.callApi<FileFrontendHistorizedDTO[]>(endpoints.GroupFiles, { groupId }, 'GET'),
      this.ws.webSocketData<FileFrontendHistorizedDTO[]>(endpoints.GroupFiles, [] as FileFrontendHistorizedDTO[], groupId),
    );
  }

  fileChange(file: GroupFileChangeDTO, method: HttpMethods) {
    this.api.callApi(endpoints.GroupFiles, file, method).subscribe();
  }
}