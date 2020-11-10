import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './shared/auth-guard.service';
import { RoleGuardService as RoleGuard } from './shared/role-guard.service';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { StaffComponent } from './components/staff/staff.component';
import { OthersComponent } from './others/others.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'register', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent},
  { path: 'adminDashboard', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }  },
  { path: 'userDashboard', component: UserComponent, canActivate: [RoleGuard], data: { expectedRole: 'user' }  },
  { path: 'staffDashboard', component: StaffComponent, canActivate: [RoleGuard], data: { expectedRole: 'staff' }  },
  { path: 'othersDashboard', component: OthersComponent, canActivate: [RoleGuard], data: { expectedRole: 'others' }  },
  { path: 'notauthorized', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
