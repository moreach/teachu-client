import { Component } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { LogoutDTO } from 'src/app/DTOs/LogoutDTO';
import { MessageDTO } from 'src/app/DTOs/MessageDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { TokenService } from 'src/app/Framework/API/token.service';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent {

  pingResult: string = '';

  constructor(
    private tokenService: TokenService,
    private api: ApiService,
  ) { }

  ping() {
    this.api.callApi<MessageDTO>(endpoints.Ping, {}, 'GET').subscribe(result => {
      this.pingResult = result.message;
    });
  }

  logout(){
    const refresh = this.tokenService.getRefreshToken();
    if (refresh) {
      this.api.callApi(endpoints.Login, { refresh } as LogoutDTO, 'DELETE').subscribe(_ => {
        this.tokenService.removeToken();
        this.tokenService.removeRefreshToken();
        this.tokenService.removeExpired();
        location.reload();
      });
    }
  }
}
