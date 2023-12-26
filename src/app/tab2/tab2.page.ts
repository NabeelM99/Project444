import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Admin } from '../services/user-management.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  //implements OnInit
  userID!: string;
  admin!: Admin;
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController
  ) {}

  // async ngOnInit() {
  //   if (this.userManagementService.userID) {
  //     this.userID = this.userManagementService.userID;
  //   } else {
  //     this.alertController.create({
  //       header: 'Error',
  //       message: 'You are not logged in',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: () => {
  //             this.navController.navigateForward('/login');
  //           },
  //         },
  //       ],
  //     });
  //   }
  //   this.admin = await this.userManagementService.getAdmin(this.userID);
  // }
}
