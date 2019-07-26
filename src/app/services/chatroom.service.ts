import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoom } from '../models/chat-room';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>('https://localhost:5002/api/chatrooms');
  }

  create(model: ChatRoom): Observable<void> {
    return this.http.post<void>('https://localhost:5002/api/chatrooms', model);
  }
}
