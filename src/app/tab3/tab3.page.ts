import { Component } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
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

  createHall() {}
}
