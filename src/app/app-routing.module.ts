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
import {ClassListComponent} from "./Pages/classlist/class-list.component";
import { ClasslistComponent } from './Pages/classlist/classlist.component';
import { ChallengeActiveComponent } from './Pages/challenge/challenge-active/challenge-active.component';
import { ChallengeComponent } from './Pages/challenge/challenge.component';
import { CreateSetEditComponent } from './Pages/create/create-set-edit/create-set-edit.component';
import { CreateComponent } from './Pages/create/create.component';
import { DrawComponent } from './Pages/draw/draw.component';
import { DrawingComponent } from './Pages/draw/drawing/drawing.component';
import { GroupChatComponent } from './Pages/group/group-chat/group-chat.component';
import { GroupFilesComponent } from './Pages/group/group-files/group-files.component';
import { GroupComponent } from './Pages/group/group.component';
import { LearnQuestionStepperComponent } from './Pages/learn/learn-question-stepper/learn-question-stepper.component';
import { LearnComponent } from './Pages/learn/learn.component';
import { TestResultOverviewComponent } from './Pages/test/test-result-overview/test-result-overview.component';
import { TestResultComponent } from './Pages/test/test-result/test-result.component';
import { TestSettingsComponent } from './Pages/test/test-settings/test-settings.component';
import { TestStepperComponent } from './Pages/test/test-stepper/test-stepper.component';
import { TestComponent } from './Pages/test/test.component';
import { TogetherAskComponent } from './Pages/together/together-ask/together-ask.component';
import { TogetherChatComponent } from './Pages/together/together-chat/together-chat.component';
import { TogetherConnectComponent } from './Pages/together/together-connect/together-connect.component';
import { TogetherSwipeComponent } from './Pages/together/together-swipe/together-swipe.component';

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
      { path:`${appRoutes.Class}/:${appRoutes.ClassName}`, component: ClassListComponent },
      { path: appRoutes.Grades, component: GradesComponent },
      { path: appRoutes.Absences, component: AbsencesComponent },
      { path: appRoutes.Chat, component: ChatOverviewComponent, pathMatch: 'full' },
      { path: `${appRoutes.Chat}/:${appRoutes.ChatId}`, component: ChatConversationComponent, pathMatch: 'full' },
      { path: `${appRoutes.Chat}/:${appRoutes.ChatId}/${appRoutes.ConversationInfo}`, component: ChatConversationInfoComponent },
      { path: appRoutes.UserSettings, component: UserSettingsComponent },

      { path: appRoutes.TogetherAsk, component: TogetherAskComponent },
      { path: `${appRoutes.TogetherChat}/:${appRoutes.TogetherChatId}`, component: TogetherChatComponent },
      { path: appRoutes.TogetherConnect, component: TogetherConnectComponent },
      { path: appRoutes.TogetherSwipe, component: TogetherSwipeComponent },
      { path: appRoutes.Group, component: GroupComponent },
      { path: `${appRoutes.GroupChat}/:${appRoutes.GroupChatId}`, component: GroupChatComponent },
      { path: `${appRoutes.GroupFiles}/:${appRoutes.GroupFilesId}`, component: GroupFilesComponent },
      { path: appRoutes.Create, component: CreateComponent },
      { path: `${appRoutes.Create}/:${appRoutes.CreateSetEditId}`, component: CreateSetEditComponent },
      { path: appRoutes.Learn, component: LearnComponent },
      { path: `${appRoutes.Learn}/${appRoutes.LearnCard}/:${appRoutes.LearnId}`, component: LearnQuestionStepperComponent },
      { path: `${appRoutes.Learn}/${appRoutes.LearnWrite}/:${appRoutes.LearnId}`, component: LearnQuestionStepperComponent },
      { path: appRoutes.Challenge, component: ChallengeComponent },
      { path: `${appRoutes.Challenge}/:${appRoutes.ChallengeId}`, component: ChallengeActiveComponent },
      { path: appRoutes.Test, component: TestComponent },
      { path: `${appRoutes.Test}/${appRoutes.TestResult}/:${appRoutes.TestId}`, component: TestResultComponent },
      { path: `${appRoutes.Test}/${appRoutes.TestResultOverview}/:${appRoutes.TestId}`, component: TestResultOverviewComponent },
      { path: `${appRoutes.Test}/${appRoutes.TestResult}/:${appRoutes.TestUserId}/:${appRoutes.TestId}`, component: TestResultComponent },
      { path: `${appRoutes.Test}/${appRoutes.TestSetting}/:${appRoutes.TestId}`, component: TestSettingsComponent },
      { path: `${appRoutes.Test}/${appRoutes.TestStepper}/:${appRoutes.TestId}`, component: TestStepperComponent },
      { path: appRoutes.Draw, component: DrawComponent },
      { path: `${appRoutes.Draw}/:${appRoutes.DrawCollectionId}/:${appRoutes.DrawPageId}`, component: DrawingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
