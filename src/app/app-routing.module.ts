import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './Config/appRoutes';
import { AppGuard } from './Framework/API/app.guard';
import { LoginComponent } from './Pages/login/login.component';
import { PingComponent } from './Pages/ping/ping.component';
import {UserSettingsComponent} from "./Pages/user-settings/user-settings.component";

const routes: Routes = [
  { path: appRoutes.Login, component: LoginComponent },
  {
    path: appRoutes.App,
    canActivate: [AppGuard],
    children: [
      { path: appRoutes.Ping, component: PingComponent },
      { path: appRoutes.UserSettings, component: UserSettingsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
