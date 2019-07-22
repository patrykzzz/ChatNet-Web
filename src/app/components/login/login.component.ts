import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from "@angular/forms";

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

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.getTokenForUser(this.email.value, this.password.value)
      .subscribe(token => this.saveTokenInLocalStorage(token), error => {
        console.log(error)
      });
  }

  saveTokenInLocalStorage(token: string) {
    localStorage.setItem("bearer_token", token);
  }
}
