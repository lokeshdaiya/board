import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatProgressBarModule,
  MatChipsModule,
  MatGridListModule,
  MatToolbarModule
} from '@angular/material';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { MyTasksComponent, TaskResponseDialog } from './my-tasks/my-tasks.component';
import { LoadingModule } from './loading/loading.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { TaskFormComponent } from './my-tasks/task-form/task-form.component';
import { PostService } from './services/post.service';
import { UserPostMapService } from './services/userpostmap-service';
import { UserLoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UploadFileService } from './services/upload-file.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PostDetailComponent } from './welcome/post-detail';
import { SubmitRequestComponent } from './welcome/submit.request';



const config = {
  apiKey: "AIzaSyD9SAgXxdDnhcHk6scS6HVAav8z10-ibhk",
  authDomain: "stackblitz-angular-firebase.firebaseapp.com",
  databaseURL: "https://stackblitz-angular-firebase.firebaseio.com",
  projectId: "stackblitz-angular-firebase",
  storageBucket: "stackblitz-angular-firebase.appspot.com",
  messagingSenderId: "453902784138"
};


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MyTasksComponent,
    TaskResponseDialog,
    TaskFormComponent,
    UserLoginComponent,
    DashboardComponent,
    PostDetailComponent,
    SubmitRequestComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgxChartsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatGridListModule,
    MatToolbarModule,
    NgCircleProgressModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    UserProfileModule,
    AngularFireStorageModule,
    LoadingModule
  ],
  entryComponents: [
    TaskResponseDialog,
    TaskFormComponent,
    SubmitRequestComponent
  ],
  providers: [UserService, PostService, UserPostMapService, AuthService, UploadFileService],

  bootstrap: [AppComponent]
})
export class AppModule {}
