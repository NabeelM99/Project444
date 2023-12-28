import { Component, OnInit } from '@angular/core';
import {
  Hall,
  UserManagementService,
} from '../services/user-management.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss'],
})
export class Tab7Page {
  halls: Hall[] = [];
  filteredHalls: Hall[] = [];
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController
  ) {}

  ionViewWillEnter() {
    this.initializePage();
  }

  private async initializePage() {
    if (this.userManagementService.userID === '') {
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
    } else {
      this.initilizeHalls();
    }
  }

  initilizeHalls() {
    this.userManagementService.halls$.subscribe((halls) => {
      this.halls = halls;
      this.filteredHalls = halls;
    });
  }

  viewHall(hall: any) {
    this.navController.navigateForward('/view-hall/' + hall.id);
  }

  updateSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.trim() === '') {
      this.filteredHalls = this.halls;
    } else {
      this.filteredHalls = this.halls.filter((hall) =>
        hall.name.toLowerCase().includes(searchTerm)
      );
    }
  }
}
