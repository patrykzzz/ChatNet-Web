import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  create(): Observable<void> {
    return this.http.get<void>('https://localhost:5002/api/chatrooms');
  }
}
