import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { DrawCanvasSegmentsWrapperDTO } from 'src/app/DTOs/Draw/DrawCanvasSegmentsWrapperDTO';
import { DrawDrawingDTO } from 'src/app/DTOs/Draw/DrawDrawingDTO';
import { DrawPageCreateDTO } from 'src/app/DTOs/Draw/DrawPageCreateDTO';
import { DrawPageEditDTO } from 'src/app/DTOs/Draw/DrawPageEditDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { WebSocketService } from 'src/app/Framework/API/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor(
    private api: ApiExtensionService,
    private ws: WebSocketService,
  ) { }

  getPages$(collectionId: string, edit: boolean): Observable<DrawDrawingDTO> {
    return merge(
      this.api.callApi<DrawDrawingDTO>(endpoints.DrawPages, { collectionId, edit }, 'GET'),
      this.ws.webSocketData<DrawDrawingDTO>(endpoints.DrawPages, {} as DrawDrawingDTO, collectionId)
    );
  }

  getSegments$(pageId: string) {
    return this.api.callApi<DrawCanvasSegmentsWrapperDTO>(endpoints.DrawSegments, { pageId }, 'GET');
  }

  createPage$(value: DrawPageCreateDTO) {
    return this.api.callApi(endpoints.DrawPages, value, 'POST');
  }

  updatePage$(value: DrawPageEditDTO) {
    return this.api.callApi(endpoints.DrawPages, value, 'PUT');
  }
}