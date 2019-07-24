import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginModel } from '../models/user-login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {

  }

  getTokenForUser(model: UserLoginModel): Observable<string> {
    return this.httpClient.post<string>('https://localhost:5002/api/identity/login', model);
  }
}
