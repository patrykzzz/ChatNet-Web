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

  constructor(private chatroomService: ChatroomService, private notificationService: NotificationService,
    public dialog: MatDialog) { }

  chatrooms: ChatRoom[];
  chatRoomHubConnection: signalR.HubConnection;
  message: string;

  ngOnInit() {
    this.chatRoomHubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5002/chatroomhub')
      .build();

    this.chatRoomHubConnection.start()
      .catch(error => {
        this.notificationService.showMessage("Can't connect with SignalR");
      });
      
    this.chatRoomHubConnection.on('ChatRoomCreated', (chatRoom: ChatRoom) => {
      this.chatrooms = this.chatrooms.concat(chatRoom)
        .sort(c => c.createdOnUtc.valueOf());
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
          this.notificationService.showMessage('Chat room created.');
        }, error => this.notificationService.showMessage('Error when creating a chat room.'));
      }
    });
  }

  sendMessage() {
    this.chatroomService.getAll()
      .subscribe(() => {
        this.notificationService.showMessage('Room created successfully');
        this.chatRoomHubConnection.send('NewChatRoomCreated', 'test');
      },
        error => console.log(error));
  }

}
