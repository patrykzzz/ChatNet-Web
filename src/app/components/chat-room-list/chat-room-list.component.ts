import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  constructor() { }

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  chatrooms = [{ name: 'first' }, { name: 'second' }];

  messages = [{ sender: 'Marek', content: 'Test message', time: new Date() },
  { sender: 'Marek', content: 'Test message two', time: new Date(), own: true }];

  ngOnInit() {
  }

}
