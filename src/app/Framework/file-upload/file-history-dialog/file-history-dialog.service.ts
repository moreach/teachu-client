import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { FileFrontendDTO } from 'src/app/DTOs/File/FileFrontendDTO';
import { FileRevertDTO } from 'src/app/DTOs/File/FileRevertDTO';
import { FileVersionInfoDTO } from 'src/app/DTOs/File/FileVersionInfoDTO';
import { ApiExtensionService } from '../../API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class FileHistoryDialogService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getVersions(path: string) {
    return this.api.callApi<FileVersionInfoDTO[]>(endpoints.FileVersions, { path }, 'GET');
  }

  revertVersion(versionPath: string, filePath: string) {
    const value = {
      versionPath,
      filePath,
    } as FileRevertDTO;
    return this.api.callApi<FileFrontendDTO>(endpoints.FileVersions, value, 'POST');
  }

  downloadVersion(filePath: string) {
    return this.api.callFileDownload(endpoints.FileVersionUploadDownload, { filePath });
  }
}
