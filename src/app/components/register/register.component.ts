import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserRegistrationModel } from 'src/app/models/user-registration-model';
import { RegistrationService } from 'src/app/services/registration.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  get email(): AbstractControl {
    return this.registrationForm.controls.email;
  }

  get password(): AbstractControl {
    return this.registrationForm.controls.password;
  }

  get username(): AbstractControl {
    return this.registrationForm.controls.username;
  }

  get firstName(): AbstractControl {
    return this.registrationForm.controls.firstName;
  }

  get lastName(): AbstractControl {
    return this.registrationForm.controls.lastName;
  }

  constructor(private registrationService: RegistrationService, private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }


  register() {
    if (this.registrationForm.invalid) {
      return;
    }

    let model: UserRegistrationModel = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value
    }

    this.registrationService.registerUser(model)
      .subscribe(() => {
        this.notificationService.showMessage('Registration successful.');
        this.router.navigate(['login']);
      }, error => {
        this.notificationService.showMessage('Registration failed.');
      });
  }

}
