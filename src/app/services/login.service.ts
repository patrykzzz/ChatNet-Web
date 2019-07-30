import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginInfo } from '../models/user-login-info';
import { UserLoginModel } from '../models/user-login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {

  }

  getInfoForLogin(model: UserLoginModel): Observable<UserLoginInfo> {
    return this.httpClient.post<UserLoginInfo>('https://localhost:5002/api/identity/login', model);
  }
}
