import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorHandlingDialogComponent} from './Framework/error-handling-dialog/error-handling-dialog.component';
import {SpinnerDirective} from './Framework/spinner/spinner.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './Material/material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorHandlerInterceptor} from './Framework/API/error-handler.interceptor';
import {LoginComponent} from './Pages/login/login.component';
import {CustomToastyComponent} from './Framework/custom-toasty/custom-toasty.component';
import {ToastrModule} from 'ngx-toastr';
import {BreadcrumbsComponent} from './Framework/breadcrumbs/breadcrumbs.component';
import {LanguageLookupComponent} from './Framework/Languages/language-lookup.component';
import {TextEditorComponent} from './Framework/text-editor/text-editor.component';
import {TextEditorActionBarComponent} from './Framework/text-editor/text-editor-action-bar.component';
import {MenuTreeComponent} from './Conponents/menu-tree/menu-tree.component';
import {ExpansionWrapperComponent} from './Conponents/menu-tree/expansion-wrapper/expansion-wrapper.component';
import {MenuNodeComponent} from './Conponents/menu-tree/menu-node/menu-node.component';
import {MenuLeaveComponent} from './Conponents/menu-tree/menu-leave/menu-leave.component';
import { ExpansionWrapperToggleComponent } from "./Conponents/menu-tree/expansion-content-toggle/expansion-wrapper-toggle.component";
import {OutlineNavHeaderComponent} from './Conponents/outline-header/outline-nav-header/outline-nav-header.component';
import {OutlineHeaderComponent} from './Conponents/outline-header/outline-header/outline-header.component';
import {UserSettingsComponent} from "./Pages/user-settings/user-settings.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {ProfilePicComponent} from './Conponents/profile-pic/profile-pic.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TimetableComponent } from './Pages/timetable/timetable.component';
import { GradesComponent } from './Pages/grades/grades.component';
import { ReadonlyFieldComponent } from './Conponents/readonly-field/readonly-field.component';
import { ChangePasswordDialogComponent } from './Pages/user-settings/change-password-dialog/change-password-dialog.component';
import { ChatOverviewComponent } from './Pages/chat/chat-overview/chat-overview.component';
import { ChatConversationComponent } from './Pages/chat/chat-conversation/chat-conversation.component';
import { ChatConversationInfoComponent } from './Pages/chat/chat-conversation-info/chat-conversation-info.component';
import { GroupChatDialogComponent } from './Pages/chat/group-chat-dialog/group-chat-dialog.component';
import { PrivateChatDialogComponent } from './Pages/chat/private-chat-dialog/private-chat-dialog.component';
import { AbsencesComponent } from './Pages/absences/absences.component';
import { SchoolInfosComponent } from './Pages/school-infos/school-infos.component';
import {GradesStudentViewComponent} from "./Pages/grades/grades-student-view/grades-student-view.component";
import { GradesParentViewComponent } from './Pages/grades/grades-parent-view/grades-parent-view.component';
import { RecentExamsComponent } from './Conponents/grades/recent-exams/recent-exams.component';
import { ClassGradesComponent } from './Conponents/grades/class-grades/class-grades.component';
import { GradeDetailComponent } from './Conponents/grades/grade-detail/grade-detail.component';
import { LessonDetailsComponent } from './Pages/timetable/lesson-details/lesson-details.component';
import { ParentChildPreviewComponent } from './Conponents/grades/parent-child-preview/parent-child-preview.component';
import { ClasslistComponent } from './Pages/classlist/classlist.component';
import { ClasslistListComponent } from './Pages/classlist/classlist-list/classlist-list.component';
import { ClasslistDetailComponent } from './Pages/classlist/classlist-detail/classlist-detail.component';
import { ChooseStudentDialogComponent } from './Pages/login/choose-student-dialog/choose-student-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ErrorHandlingDialogComponent,
        SpinnerDirective,
        LoginComponent,
        CustomToastyComponent,
        LanguageLookupComponent,
        BreadcrumbsComponent,
        TextEditorComponent,
        TextEditorActionBarComponent,
        UserSettingsComponent,
        MenuTreeComponent,
        ExpansionWrapperComponent,
        MenuNodeComponent,
        MenuLeaveComponent,
        ExpansionWrapperToggleComponent,
        OutlineNavHeaderComponent,
        OutlineHeaderComponent,
        ProfilePicComponent,
        DashboardComponent,
        TimetableComponent,
        GradesComponent,
        ReadonlyFieldComponent,
        ChangePasswordDialogComponent,
        GradesStudentViewComponent,
        GradesParentViewComponent,
        ChatOverviewComponent,
        ChatConversationComponent,
        ChatConversationInfoComponent,
        GroupChatDialogComponent,
        PrivateChatDialogComponent,
        AbsencesComponent,
        SchoolInfosComponent,
        RecentExamsComponent,
        ClassGradesComponent,
        GradeDetailComponent,
        LessonDetailsComponent,
        ParentChildPreviewComponent,
        ParentChildPreviewComponent,
        ClasslistComponent,
        ClasslistListComponent,
        ClasslistDetailComponent,
        ChooseStudentDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en-GB',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot({
            toastComponent: CustomToastyComponent,
            timeOut: 3000,
            maxOpened: 5,
            newestOnTop: true,
            preventDuplicates: true,
            positionClass: 'toast-bottom-right',
        }),
        MaterialFileInputModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'de-DE'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
