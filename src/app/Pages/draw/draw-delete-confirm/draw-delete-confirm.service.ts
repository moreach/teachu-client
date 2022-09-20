import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class DrawDeleteConfirmService {

  constructor(
    private api: ApiService,
  ) { }

  deleteCollection$(collectionId: string) {
    return this.api.callApi(endpoints.DrawCollections, { collectionId }, 'DELETE');
  }

  deletePage$(collectionId: string, pageId: string) {
    return this.api.callApi(endpoints.DrawPages, { collectionId, pageId }, 'DELETE');
  }
}