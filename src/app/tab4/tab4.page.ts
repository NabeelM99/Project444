import { Component } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController
  ) {}

  ionViewWillEnter() {
    this.initializePage();
  }
  private async initializePage() {
    if (this.userManagementService.userID != '') {
      return;
    } else {
      const alert = await this.alertController
        .create({
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
        })
        .then((alert) => {
          alert.present();
        });
    }
  }

  reply(message: any) {
    this.navController.navigateForward('/message-replay/' + message.id);
  }
}
