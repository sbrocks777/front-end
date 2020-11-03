import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val) {
    this.type = val;
    this.serverMessage = '';
    this.form.reset();
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get mobileNumber() {
    return this.form.get('mobileNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const mobileNumber = this.mobileNumber.value;

    try {
      if (this.isLogin) {
        await this.authService.signIn(email, password).then((result: any) => {
          if (!result.user.emailVerified) {
            this.authService.signOut();
            this.serverMessage = 'Email is not verified';
            this.authService.sendVerificationMail().then(() => {
              alert('Your email is not verified, Please Check Your Inbox!');
            });
          } else {
            this.router.navigate(['']);
          }
        });
      }
      if (this.isSignup) {
        await this.authService
          .signUp(firstName, lastName, email, password, mobileNumber)
          .then((data) => {
            this.type = 'login';
          });
      }
      if (this.isPasswordReset) {
        await this.authService.passwordReset(email);
        this.serverMessage = 'Check Your Email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
