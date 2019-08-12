import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = true;
  redirectUrl: string;

  constructor(
    private router: Router
  ) { }

  login() {
    this.router.navigateByUrl('');
  }

  signUp(value) {
    this.router.navigateByUrl('/welcome/login');
  }
}
