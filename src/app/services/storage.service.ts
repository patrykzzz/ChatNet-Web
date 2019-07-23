import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAccessToken(token: string): void {
    localStorage.setItem('bearer_token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('bearer_token');
  }

}
