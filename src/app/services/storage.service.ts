import { Injectable } from '@angular/core';
import { UserLoginInfo } from '../models/user-login-info';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAccessToken(): string {
    return localStorage.getItem('bearer_token');
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  removeUserLoginInfo(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('bearer_token');
  }

  saveUserLoginInfo(info: UserLoginInfo) {
    localStorage.setItem('username', info.username);
    localStorage.setItem('email', info.email);
    localStorage.setItem('first_name', info.firstName);
    localStorage.setItem('last_name', info.lastName);
    localStorage.setItem('bearer_token', info.token);
  }
}
