import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninDirective } from './google-signin.directives';
import { EmailLoginComponent } from './email-login/email-login.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [LoginPageComponent, EmailLoginComponent, GoogleSigninDirective],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class UserModule {}
