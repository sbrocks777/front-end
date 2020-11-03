import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/core/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  loading = true;
  serverMessage: string;
  isDisabled: boolean = true;

  user: User;

  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
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
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
    });

    this.authService.user$.subscribe((u) => {
      this.loading = false;
      if (u) {
        this.form.setValue({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          mobileNumber: u.mobileNumber,
        });
      } else {
        console.log('Not Logged in!');
      }
    });

    this.form.disable();
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

  enableForm() {
    this.isDisabled = !this.isDisabled;
    this.isDisabled ? this.form.disable() : this.form.enable();
    this.email.disable();
  }

  onSubmit() {
    let formData = this.form.value;
    this.authService
      .updateProfile(formData)
      .then(() => (this.isDisabled = !this.isDisabled)),
      (err) => console.log(err);
  }
}
