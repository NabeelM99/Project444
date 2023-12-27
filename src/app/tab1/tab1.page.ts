import { Component } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  userID: string = '';
  userType: string = '';
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController
  ) {}

  ionViewWillEnter() {
    this.initializePage();
  }
  private async initializePage() {
    if (this.userManagementService.userID) {
      this.userID = this.userManagementService.userID;
      return;
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
  }

  viewEvent(event: any) {
    this.navController.navigateForward('/view-event/' + event.id);
  }
}
