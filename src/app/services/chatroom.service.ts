import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoom } from '../models/chat-room';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  private apiRoot = 'https://localhost:5002/api/chatrooms';

  getAll(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(this.apiRoot);
  }

  create(model: ChatRoom): Observable<void> {
    return this.http.post<void>(this.apiRoot, model);
  }

  getChatRoom(chatRoomId: string): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(`${this.apiRoot}/${chatRoomId}`);
  }
}
