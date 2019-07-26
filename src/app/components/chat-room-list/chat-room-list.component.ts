import { Component, OnInit } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatroomService } from 'src/app/services/chatroom.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ChatRoom } from 'src/app/models/chat-room';
import { MatDialog } from '@angular/material';
import { CreateChatroomComponent } from '../dialogs/create-chatroom/create-chatroom.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5002/chatroomhub')
    .build();

  constructor(private chatroomService: ChatroomService, private notificationService: NotificationService,
    public dialog: MatDialog) { }

  chatrooms: ChatRoom[];

  ngOnInit() {
    this.connection.start().catch(error => console.log(error));
    this.connection.on('chatroomCreated', (chatRoomId: string, chatRoomName: string) => {
      this.chatrooms = this.chatrooms.concat({ id: chatRoomId, name: chatRoomName });
    })

    this.chatroomService.getAll()
      .subscribe(data => this.chatrooms = data, error => this.notificationService.showMessage('Unable to get chatrooms.'));
  }

  createChatRoom() {
    const dialogRef = this.dialog.open(CreateChatroomComponent);
    dialogRef.afterClosed().subscribe((form: FormGroup) => {
      if (form.value) {
        let chatRoom: ChatRoom = Object.assign({}, form.value);
        this.chatroomService.create(chatRoom).subscribe(() => {
          this.connection.send('NewChatRoomCreated', chatRoom);
        }, error => this.notificationService.showMessage('Error when creating a chat room.'));
      }
    });
  }

  sendMessage() {
    this.chatroomService.getAll()
      .subscribe(() => {
        this.notificationService.showMessage('Room created successfully');
        this.connection.send('NewChatRoomCreated', 'test');
      },
        error => console.log(error));
  }

}
