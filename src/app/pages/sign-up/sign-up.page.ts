import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidatorPage } from '../password-validator/password-validator.page';
import { AlertController } from '@ionic/angular';

export interface Button {
  label: string;
  active: boolean;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  buttons: Button[] = [
    { label: 'Client', active: false },
    { label: 'Guest', active: false },
  ];

  signUpForm!: FormGroup;
  selectedUser!: string | null;
  username!: string;
  password!: string;
  confirmPassword!: string;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController
  ) {
    this.signUpForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$!%*?&])[A-Za-z\\d@$!%*?&]*$'
          ),
          Validators.minLength(8),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$!%*?&])[A-Za-z\\d@$!%*?&]*$'
          ),
          Validators.minLength(8),
        ]),
        PasswordValidatorPage.matchPassword, // Custom validator function
      ],
    });
  }

  changeColor(button: Button) {
    this.buttons.forEach((btn) => {
      btn.active = false;
    });
    button.active = true;
    this.selectedUser = button.label;
  }

  async SignUp(value: any) {
    this.username = value.username;
    this.password = value.password;
    if (this.selectedUser == 'Guest') {
      // guest sign up
    } else if (this.selectedUser == 'Client') {
      // client sign up
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please select a user type',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
