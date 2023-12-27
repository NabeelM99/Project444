import { Component } from '@angular/core';
import {
  UserManagementService,
  Admin,
} from '../services/user-management.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  userID!: string;
  admin: Admin = {
    id: '',
    username: '',
    password: '',
    profile_image: '',
    user_type: '',
  };

  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController
  ) {}

  ionViewWillEnter() {
    this.initializePage();
  }

  private async initializePage() {
    if (this.admin.username != '') {
      return;
    } else if (this.userManagementService.userID) {
      this.userID = this.userManagementService.userID;
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'You are not logged in',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navController.navigateForward('/login');
            },
          },
        ],
      });

      await alert.present();
    }

    this.admin = await this.userManagementService.getAdmin(this.userID);
  }

  approveRequest(request: any) {
    this.userManagementService
      .updateRequest(request.id, {
        status: 'approve',
      })
      .then(() => {
        this.alertController
          .create({
            header: 'Success',
            message: 'Request approved successfully',
            buttons: [
              {
                text: 'OK',
              },
            ],
          })
          .then((alert) => {
            alert.present();
          });
      });
  }

  rejectRequest(request: any) {
    this.userManagementService
      .updateRequest(request.id, {
        status: 'reject',
      })
      .then(() => {
        this.alertController
          .create({
            header: 'Success',
            message: 'Request rejected successfully',
            buttons: ['ok'],
          })
          .then((alert) => {
            alert.present();
          });
      });
  }
}
