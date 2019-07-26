import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.css']
})
export class CreateChatroomComponent implements OnInit {

  createChatRoomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  get name(): AbstractControl {
    return this.createChatRoomForm.controls.name;
  }

  constructor(public dialogRef: MatDialogRef<CreateChatroomComponent>) { }

  ngOnInit() {
  }

}
