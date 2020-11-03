import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import 'firebase/auth';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  user: any;

  providerIsGoogle: boolean = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.checkPasswords }
    );

    // console.log(firebase.auth().currentUser.providerId());

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.getUser();
      }
    });
  }

  getUser() {
    const user = firebase.auth().currentUser;
    user.getIdTokenResult().then((res) => {
      if (res.signInProvider === 'google.com') {
        this.providerIsGoogle = true;
      }
    });
  }

  get fc(): any {
    return this.form['controls'];
  }

  passwordDoesMatch() {
    return this.fc.newPassword.value === this.fc.confirmPassword.value;
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  sendPassResetEmail() {
    this.afAuth.sendPasswordResetEmail(this.user.email).then(
      () => {
        alert('Please Check Your Inbox!');
      },
      (err) => alert(err)
    );
  }

  onSubmit() {
    let data = this.form.value;
    this.authService.changePassword(data);
  }
}
