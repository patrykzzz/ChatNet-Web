import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  send(message: string, chatRoomId: string): Observable<void> {
    return this.http.post<void>('https://localhost:5002/api/messages', {
      content: message,
      chatRoomId
    });
  }
}
