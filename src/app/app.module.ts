import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppendTokenInterceptor } from './interceptors/append-token-interceptor';
import { CreateChatroomComponent } from './components/dialogs/create-chatroom/create-chatroom.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatRoomListComponent,
    RegisterComponent,
    MenuComponent,
    CreateChatroomComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppendTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [CreateChatroomComponent]
})
export class AppModule { }
