import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationModel } from '../models/user-registration-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  registerUser(model: UserRegistrationModel): Observable<void> {
    return this.httpClient.post<void>('https://localhost:5002/api/identity/register', model);
  }
}
