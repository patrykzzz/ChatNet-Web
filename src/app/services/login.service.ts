import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {

  }

  getTokenForUser(email: string, password: string): Observable<string> {
    let loginModel = {
      email,
      password
    };
    return this.httpClient.post<string>('https://localhost:5002/api/identity/login', loginModel);
  }
}
