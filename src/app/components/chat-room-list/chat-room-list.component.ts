import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as signalR from "@aspnet/signalr";
import { ChatroomService } from 'src/app/services/chatroom.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5002/chatroomhub')
    .build();

  constructor(private chatroomService: ChatroomService, private notificationService: NotificationService) { }

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  chatrooms = [{ name: 'first' }, { name: 'second' }];

  messages = [{ sender: 'Marek', content: 'Test message', time: new Date() },
  { sender: 'Marek', content: 'Test message two', time: new Date(), own: true }];

  ngOnInit() {
    this.connection.start().catch(error => console.log(error));
    this.connection.on('chatroomCreated', (chatRoomName: string, chatRoomOwner: string) => {
      this.chatrooms = this.chatrooms.concat({ name: chatRoomName });
    })
  }

  sendMessage() {
    this.chatroomService.create()
      .subscribe(() => {
        this.notificationService.showMessage('Room created successfully');
        this.connection.send('NewChatRoomCreated', 'test');
      },
        error => console.log(error));
  }

}
