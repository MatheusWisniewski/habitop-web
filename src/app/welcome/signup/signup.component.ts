import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})');

    this.signupForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.pattern(strongRegex), Validators.required]],
      passwordRepeat: ['', [Validators.pattern(strongRegex), Validators.required]],
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.value);
  }
}
