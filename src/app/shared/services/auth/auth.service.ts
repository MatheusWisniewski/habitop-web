import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = true;
  redirectUrl: string;

  RESOURCE_URL = API_URL + 'users/';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.httpClient.post(this.RESOURCE_URL + 'login', {
      email,
      password
    });
  }

  signUp(email: string, password: string) {
    return this.httpClient.post(this.RESOURCE_URL + 'register', {
      email,
      password
    });
  }

  getHabits() {
    return this.httpClient.get(this.RESOURCE_URL + localStorage.getItem('user_id') + '/habits');
  }
}
