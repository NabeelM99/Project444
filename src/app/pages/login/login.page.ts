import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
export interface Button {
  label: string;
  active: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  buttons: Button[] = [
    { label: 'Client', active: false },
    { label: 'Guest', active: false },
    { label: 'Admin', active: false },
  ];

  loginForm!: FormGroup;
  selectedUser!: string | null;
  username!: string;
  password!: string;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public userManagementService: UserManagementService,
    public navController: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      password: ['', [Validators.required]],
    });
  }

  changeColor(button: Button) {
    this.buttons.forEach((btn) => {
      btn.active = false;
    });
    button.active = true;
    this.selectedUser = button.label;
  }

  Login(val: any) {
    this.username = val.username;
    this.password = val.password;
    if (this.selectedUser == 'Client') {
      this.userManagementService
        .loginClient(this.username, this.password)
        .then((docRef) => {
          if (docRef) {
            // Client logged in successfully
            this.alertController
              .create({
                header: 'Success',
                message: 'Client logged in successfully',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.navController.navigateForward('/home');
                    },
                  },
                ],
              })
              .then((alert) => {
                alert.present();
              });
          } else {
            // Client not found or incorrect credentials
            this.alertController
              .create({
                header: 'Error',
                message: 'either username or password is incorrect.',
                buttons: ['OK'],
              })
              .then((alert) => {
                alert.present();
              });
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
          this.alertController
            .create({
              header: 'Error in login',
              message: 'An unexpected error occurred. Please try again later.',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        });
    } else if (this.selectedUser == 'Guest') {
      this.userManagementService
        .loginGuest(this.username, this.password)
        .then((docRef) => {
          if (docRef) {
            // Guest logged in successfully
            this.alertController
              .create({
                header: 'Success',
                message: 'Guest logged in successfully',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.navController.navigateForward('/home');
                    },
                  },
                ],
              })
              .then((alert) => {
                alert.present();
              });
          } else {
            // Guest not found or incorrect credentials
            this.alertController
              .create({
                header: 'Error',
                message: 'either username or password is incorrect.',
                buttons: ['OK'],
              })
              .then((alert) => {
                alert.present();
              });
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
          this.alertController
            .create({
              header: 'Error in login',
              message: 'An unexpected error occurred. Please try again later.',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        });
    } else if (this.selectedUser == 'Admin') {
      this.userManagementService
        .loginAdmin(this.username, this.password)
        .then((docRef) => {
          if (docRef) {
            // Admin logged in successfully
            this.alertController
              .create({
                header: 'Success',
                message: 'Admin logged in successfully',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.navController.navigateForward('/home');
                    },
                  },
                ],
              })
              .then((alert) => {
                alert.present();
              });
          } else {
            // Admin not found
            this.alertController
              .create({
                header: 'Error',
                message: 'either username or password is incorrect.',
                buttons: ['OK'],
              })
              .then((alert) => {
                alert.present();
              });
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
          this.alertController
            .create({
              header: 'Error in login',
              message: 'An unexpected error occurred. Please try again later.',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        });
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'Please select a user type',
          buttons: ['OK'],
        })
        .then((alert) => {
          alert.present();
        });
    }
  }
}
