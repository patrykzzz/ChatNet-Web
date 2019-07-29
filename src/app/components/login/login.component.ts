import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from "@angular/forms";
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/models/user-login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  constructor(private loginService: LoginService, private notificationService: NotificationService,
              private storageService: StorageService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const model: UserLoginModel = {
      email: this.email.value,
      password: this.password.value
    };

    this.loginService.getTokenForUser(model)
      .subscribe(token => {
        this.storageService.saveAccessToken(token.token);
        this.notificationService.showMessage('Logged in!');
        this.router.navigate(['chatrooms']);
      }, error => {
        this.notificationService.showMessage('Something went wrong...');
      });
  }

}
