import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})');

    function passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.parent && c.parent.get('password') && c.parent.get('password').value !== c.value) {
          return {invalid: true};
      }
    }

    this.signupForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      // password: ['', [Validators.pattern(strongRegex), Validators.required]],
      // passwordRepeat: ['', [Validators.pattern(strongRegex), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(8), passwordConfirming]],
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.get('email').value, this.signupForm.get('password').value)
      .subscribe(
        resp => {
          this.snackBar.open('Usuário criado com sucesso.');
          this.router.navigateByUrl('/welcome/login');
        },
        err => {
          this.snackBar.open(err.error);
        }
      );
  }
}
