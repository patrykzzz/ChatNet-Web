import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ChatRoom } from 'src/app/models/chat-room';
import { MatDialog } from '@angular/material';
import { CreateChatroomComponent } from '../dialogs/create-chatroom/create-chatroom.component';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  constructor(private chatroomService: ChatroomService, private notificationService: NotificationService,
              public dialog: MatDialog, private storageService: StorageService, private messageService: MessageService) { }

  chatrooms: ChatRoom[];
  chatroomHubConnection: signalR.HubConnection;
  message: string;
  currentChatroom: ChatRoom;
  username: string;

  ngOnInit() {
    this.chatroomHubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5002/chatroomhub', {
        accessTokenFactory: () => this.storageService.getAccessToken()
      })
      .build();

    this.chatroomHubConnection.start()
      .catch(error => {
        this.notificationService.showMessage('Can\'t connect with SignalR');
      });

    this.chatroomHubConnection.on('ChatRoomCreated', (chatRoom: ChatRoom) => {
      this.chatrooms = this.chatrooms.concat(chatRoom)
        .sort(c => c.createdOnUtc.valueOf());
    });

    this.chatroomHubConnection.on('MessageReceived', (message: Message) => {
      if (this.currentChatroom) {
        this.currentChatroom.messages = this.currentChatroom.messages.concat(message);
      }

    });

    this.chatroomService.getAll()
      .subscribe(data => this.chatrooms = data, error => this.notificationService.showMessage('Unable to get chatrooms.'));

    this.username = this.storageService.getUsername();
  }

  createChatRoom() {
    const dialogRef = this.dialog.open(CreateChatroomComponent);
    dialogRef.afterClosed().subscribe((form: FormGroup) => {
      if (form.value) {
        const chatRoom: ChatRoom = Object.assign({}, form.value);
        this.chatroomService.create(chatRoom).subscribe(() => {
          this.notificationService.showMessage('Chat room created.');
        }, error => this.notificationService.showMessage('Error when creating a chat room.'));
      }
    });
  }

  sendMessage() {
    this.messageService.send(this.message, this.currentChatroom.id).subscribe(() => {
      return;
    }, () => this.notificationService.showMessage('Error when sending the message'));
  }

  loadChatroom(model: ChatRoom) {
    this.chatroomService.getChatRoom(model.id).subscribe(chatroom => {
      this.currentChatroom = chatroom;
      this.chatroomHubConnection.send('AddToChatRoom', chatroom.id);
    });
  }

  isCurrentUserMessage(message: Message) {
    return this.username === message.sender.username;
  }
}
