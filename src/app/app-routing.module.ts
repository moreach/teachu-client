import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './Config/appRoutes';
import { AppGuard } from './Framework/API/app.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { GradesComponent } from './Pages/grades/grades.component';
import { LoginComponent } from './Pages/login/login.component';
import { TimetableComponent } from './Pages/timetable/timetable.component';
import {UserSettingsComponent} from "./Pages/user-settings/user-settings.component";

const routes: Routes = [
  { path: appRoutes.Login, component: LoginComponent },
  {
    path: appRoutes.App,
    canActivate: [AppGuard],
    children: [
      { path: appRoutes.Dashboard, component: DashboardComponent },
      { path: appRoutes.Grades, component: GradesComponent },
      { path: appRoutes.Timetable, component: TimetableComponent },
      { path: appRoutes.UserSettings, component: UserSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
