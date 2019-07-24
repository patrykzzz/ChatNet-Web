import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private storageService: StorageService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeAccessToken();
    this.notificationService.showMessage('Logged out!');
  }

  get isLoggedIn(): boolean {
    return !!this.storageService.getAccessToken();
  }

}
