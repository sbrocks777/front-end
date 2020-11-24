import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailLoginComponent } from './email-login/email-login.component';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user']);

const routes: Routes = [
  { path: 'register', component: LoginPageComponent, pathMatch: 'full', ...canActivate(redirectLoggedInToHome) },
  { path: 'account', component: AccountComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'my-bookings', component: MyBookingsComponent, ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  declarations: [
    LoginPageComponent,
    EmailLoginComponent,
    AccountComponent,
    ChangePasswordComponent,
    MyBookingsComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class UserModule {}
