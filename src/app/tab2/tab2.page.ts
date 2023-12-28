import { Component } from '@angular/core';
import {
  UserManagementService,
  Admin,
} from '../services/user-management.service';
import { AlertController, NavController } from '@ionic/angular';
import { computeStackId } from '@ionic/angular/common/directives/navigation/stack-utils';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

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

  approveRequest(requestData: any) {
    // we want to access to the client and add the request into approve requests

    this.userManagementService
      .updateRequest(requestData.id, {
        status: 'approve',
      })
      .then(async () => {
        this.userManagementService.updateClientByID(requestData.clientID, {
          approve_request: arrayUnion(requestData.id),
          pending_requests: arrayRemove(requestData.id),
        });

        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Request approved successfully',
          buttons: [
            {
              text: 'OK',
            },
          ],
        });

        await alert.present();
      });
  }

  rejectRequest(request: any) {
    // we want to accesss to the client and add the request into reject requests
    this.userManagementService
      .updateRequest(request.id, {
        status: 'reject',
      })
      .then(async () => {
        this.userManagementService.updateClientByID(request.clientID, {
          reject_request: arrayUnion(request.id),
          pending_requests: arrayRemove(request.id),
        });

        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Request rejected successfully',
          buttons: [
            {
              text: 'OK',
            },
          ],
        });
        await alert.present();
      });
  }
}
