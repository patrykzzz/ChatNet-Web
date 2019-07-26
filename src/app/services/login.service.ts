import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginModel } from '../models/user-login-model';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {

  }

  getTokenForUser(model: UserLoginModel): Observable<UserToken> {
    return this.httpClient.post<UserToken>('https://localhost:5002/api/identity/login', model);
  }
}
