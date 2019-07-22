import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chatrooms', component: ChatRoomListComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
