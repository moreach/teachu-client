import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './Config/appRoutes';
import { AppGuard } from './Framework/API/app.guard';
import { ChatConversationComponent } from './Pages/chat/chat-conversation/chat-conversation.component';
import { ChatOverviewComponent } from './Pages/chat/chat-overview/chat-overview.component';
import { ChatConversationInfoComponent } from './Pages/chat/chat-conversation-info/chat-conversation-info.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { GradesComponent } from './Pages/grades/grades.component';
import { LoginComponent } from './Pages/login/login.component';
import { TimetableComponent } from './Pages/timetable/timetable.component';
import {UserSettingsComponent} from "./Pages/user-settings/user-settings.component";
import { SchoolInfosComponent } from './Pages/school-infos/school-infos.component';
import { AbsencesComponent } from './Pages/absences/absences.component';
import { LessonDetailsComponent } from './Pages/timetable/lesson-details/lesson-details.component';

const routes: Routes = [
  { path: '', redirectTo: `/${appRoutes.Login}`, pathMatch: 'full' },
  { path: appRoutes.App, redirectTo: `/${appRoutes.App}/${appRoutes.Dashboard}`, pathMatch: 'full' },
  { path: appRoutes.Login, component: LoginComponent },
  {
    path: appRoutes.App,
    canActivate: [AppGuard],
    children: [
      { path: appRoutes.Dashboard, component: DashboardComponent },
      { path: appRoutes.SchoolInfos, component: SchoolInfosComponent },
      { path: appRoutes.Timetable, component: TimetableComponent },
      { path: `${appRoutes.Timetable}/:${appRoutes.LessonId}`, component: LessonDetailsComponent },
      { path: appRoutes.Grades, component: GradesComponent },
      { path: appRoutes.Absences, component: AbsencesComponent },
      { path: appRoutes.Chat, component: ChatOverviewComponent, pathMatch: 'full' },
      { path: `${appRoutes.Chat}/:${appRoutes.ChatId}`, component: ChatConversationComponent, pathMatch: 'full' },
      { path: `${appRoutes.Chat}/:${appRoutes.ChatId}/${appRoutes.ConversationInfo}`, component: ChatConversationInfoComponent },
      { path: appRoutes.UserSettings, component: UserSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
