import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileContentComponent } from './user-profile/content/content.component';
import { UserLoginComponent } from './login/login.component';
import { PostDetailComponent } from './welcome/post-detail';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: WelcomeComponent },
      { path: 'home/:postId', component: PostDetailComponent, },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-tasks', component: MyTasksComponent },
      { path: 'profile', component: UserProfileContentComponent },
      {path: 'login', component: UserLoginComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
