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
import { ChatOverviewComponent } from './Pages/chat/chat-overview/chat-overview.component';
import { ChatConversationComponent } from './Pages/chat/chat-conversation/chat-conversation.component';
import { ChatConversationInfoComponent } from './Pages/chat/chat-conversation-info/chat-conversation-info.component';
import { GroupChatDialogComponent } from './Pages/chat/group-chat-dialog/group-chat-dialog.component';
import { PrivateChatDialogComponent } from './Pages/chat/private-chat-dialog/private-chat-dialog.component';
import { AbsencesComponent } from './Pages/absences/absences.component';
import { SchoolInfosComponent } from './Pages/school-infos/school-infos.component';
import { RecentExamsComponent } from './Conponents/grades/recent-exams/recent-exams.component';
import { ClassGradesComponent } from './Conponents/grades/class-grades/class-grades.component';
import { GradeDetailComponent } from './Conponents/grades/grade-detail/grade-detail.component';
import { LessonDetailsComponent } from './Pages/timetable/lesson-details/lesson-details.component';
import { ClasslistComponent } from './Pages/classlist/classlist.component';
import { ClasslistListComponent } from './Pages/classlist/classlist-list/classlist-list.component';
import { ClasslistDetailComponent } from './Pages/classlist/classlist-detail/classlist-detail.component';
import { ChooseStudentDialogComponent } from './Pages/login/choose-student-dialog/choose-student-dialog.component';
import { ParentChildSelectorComponent } from './Conponents/parent-child-selector/parent-child-selector.component';
import {ParentService} from "./Framework/API/parent.service";
import { ImageComponent } from './Framework/image/image.component';
import { ChangePasswordComponent } from './Conponents/change-password/change-password.component';
import {
    ProfilePicUploaderComponent
} from "./Conponents/profile-pic/profile-pic-uploader/profile-pic-uploader.component";
import { TextBadgeComponent } from './Conponents/text-badge/text-badge.component';
import { AbsenceVisualisationComponent } from './Conponents/absence/absence-visalisation/absence-visualisation.component';
import { AbsenceEditorComponent } from './Conponents/absence/absence-editor/absence-editor.component';
import { ChallengeActiveComponent } from './Pages/challenge/challenge-active/challenge-active.component';
import { ChallengeCancelledDialogComponent } from './Pages/challenge/challenge-cancelled-dialog/challenge-cancelled-dialog.component';
import { ChallengeCreateDialogComponent } from './Pages/challenge/challenge-create-dialog/challenge-create-dialog.component';
import { ChallengeComponent } from './Pages/challenge/challenge.component';
import { CreateQuestionReadonlyFieldComponent } from './Pages/create/create-question-readonly-field/create-question-readonly-field.component';
import { CreateQuestionDistributeAnswerComponent } from './Pages/create/create-question-types/create-question-distribute/create-question-distribute-answer/create-question-distribute-answer.component';
import { CreateQuestionDistributeComponent } from './Pages/create/create-question-types/create-question-distribute/create-question-distribute.component';
import { CreateQuestionMathematicCheckDialogComponent } from './Pages/create/create-question-types/create-question-mathematic/create-question-mathematic-check-dialog/create-question-mathematic-check-dialog.component';
import { CreateQuestionMathematicVariableComponent } from './Pages/create/create-question-types/create-question-mathematic/create-question-mathematic-variable/create-question-mathematic-variable.component';
import { CreateQuestionMathematicComponent } from './Pages/create/create-question-types/create-question-mathematic/create-question-mathematic.component';
import { CreateQuestionMultipleChoiceAnswerComponent } from './Pages/create/create-question-types/create-question-multiple-choice/create-question-multiple-choice-answer/create-question-multiple-choice-answer.component';
import { CreateQuestionMultipleChoiceComponent } from './Pages/create/create-question-types/create-question-multiple-choice/create-question-multiple-choice.component';
import { CreateQuestionOpenComponent } from './Pages/create/create-question-types/create-question-open/create-question-open.component';
import { CreateQuestionTextFieldComponent } from './Pages/create/create-question-types/create-question-text-field/create-question-text-field.component';
import { CreateQuestionTrueFalseComponent } from './Pages/create/create-question-types/create-question-true-false/create-question-true-false.component';
import { CreateQuestionWordComponent } from './Pages/create/create-question-types/create-question-word/create-question-word.component';
import { CreateSetBannerComponent } from './Pages/create/create-set-banner/create-set-banner.component';
import { CreateSetDialogComponent } from './Pages/create/create-set-dialog/create-set-dialog.component';
import { CreateSetEditComponent } from './Pages/create/create-set-edit/create-set-edit.component';
import { CreateComponent } from './Pages/create/create.component';
import { DrawDeleteConfirmComponent } from './Pages/draw/draw-delete-confirm/draw-delete-confirm.component';
import { DrawSettingsComponent } from './Pages/draw/draw-settings/draw-settings.component';
import { DrawComponent } from './Pages/draw/draw.component';
import { DrawingComponent } from './Pages/draw/drawing/drawing.component';
import { GroupChatComponent } from './Pages/group/group-chat/group-chat.component';
import { GroupFilesComponent } from './Pages/group/group-files/group-files.component';
import { GroupInfoDialogComponent } from './Pages/group/group-info-dialog/group-info-dialog.component';
import { GroupComponent } from './Pages/group/group.component';
import { LearnCreateDialogComponent } from './Pages/learn/learn-create-dialog/learn-create-dialog.component';
import { LearnQuestionStepperComponent } from './Pages/learn/learn-question-stepper/learn-question-stepper.component';
import { LearnResultComponent } from './Pages/learn/learn-result/learn-result.component';
import { LearnComponent } from './Pages/learn/learn.component';
import { TestCreateDialogComponent } from './Pages/test/test-create-dialog/test-create-dialog.component';
import { TestEditPointsComponent } from './Pages/test/test-edit-points/test-edit-points.component';
import { TestEndConfirmDialogComponent } from './Pages/test/test-end-confirm-dialog/test-end-confirm-dialog.component';
import { TestResultOverviewComponent } from './Pages/test/test-result-overview/test-result-overview.component';
import { TestResultComponent } from './Pages/test/test-result/test-result.component';
import { TestSettingsComponent } from './Pages/test/test-settings/test-settings.component';
import { TestStepperComponent } from './Pages/test/test-stepper/test-stepper.component';
import { TestComponent } from './Pages/test/test.component';
import { TogetherAskComponent } from './Pages/together/together-ask/together-ask.component';
import { TogetherChatComponent } from './Pages/together/together-chat/together-chat.component';
import { TogetherConnectComponent } from './Pages/together/together-connect/together-connect.component';
import { TogetherDetailDialogComponent } from './Pages/together/together-detail-dialog/together-detail-dialog.component';
import { TogetherSwipeComponent } from './Pages/together/together-swipe/together-swipe.component';
import { FileUploadComponent } from './Framework/file-upload/file-upload.component';
import { FileHistoryDialogComponent } from './Framework/file-upload/file-history-dialog/file-history-dialog.component';
import { GeneralQuestionComponent } from './Framework/general-question/general-question.component';

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
        ClasslistComponent,
        ClasslistListComponent,
        ClasslistDetailComponent,
        ChooseStudentDialogComponent,
        ParentChildSelectorComponent,
        ImageComponent,
        ChangePasswordComponent,
        ProfilePicUploaderComponent,
        TextBadgeComponent,
        AbsenceVisualisationComponent,
        AbsenceEditorComponent,
        FileUploadComponent,
        GroupComponent,
        CreateComponent,
        LearnComponent,
        ChallengeComponent,
        TestComponent,
        DrawComponent,
        TogetherChatComponent,
        TogetherSwipeComponent,
        TogetherAskComponent,
        TogetherConnectComponent,
        TogetherDetailDialogComponent,
        GroupInfoDialogComponent,
        GroupChatComponent,
        GroupFilesComponent,
        FileHistoryDialogComponent,
        CreateSetBannerComponent,
        CreateSetDialogComponent,
        CreateSetEditComponent,
        CreateQuestionOpenComponent,
        CreateQuestionReadonlyFieldComponent,
        CreateQuestionMathematicComponent,
        CreateQuestionTrueFalseComponent,
        CreateQuestionTextFieldComponent,
        CreateQuestionWordComponent,
        CreateQuestionMultipleChoiceComponent,
        CreateQuestionDistributeComponent,
        CreateQuestionDistributeAnswerComponent,
        CreateQuestionMathematicVariableComponent,
        CreateQuestionMultipleChoiceAnswerComponent,
        CreateQuestionMathematicCheckDialogComponent,
        ChallengeActiveComponent,
        ChallengeCreateDialogComponent,
        GeneralQuestionComponent,
        ChallengeCancelledDialogComponent,
        LearnCreateDialogComponent,
        LearnQuestionStepperComponent,
        LearnResultComponent,
        TestCreateDialogComponent,
        TestStepperComponent,
        TestResultComponent,
        TestSettingsComponent,
        TestResultOverviewComponent,
        TestEditPointsComponent,
        TestEndConfirmDialogComponent,
        DrawingComponent,
        DrawSettingsComponent,
        DrawDeleteConfirmComponent,
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
            provide: HTTP_INTERCEPTORS,
            useClass: ParentService,
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
