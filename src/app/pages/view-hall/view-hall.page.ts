import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Hall } from 'src/app/services/user-management.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-view-hall',
  templateUrl: './view-hall.page.html',
  styleUrls: ['./view-hall.page.scss'],
})
export class ViewHallPage implements OnInit {
  hallID: string = '';
  hall: Hall = {
    id: '',
    name: '',
    capacity: '',
    price: 0,
    description: '',
    location: '',
    image: '',
    available: false,
    email: '',
    noOfBoth: '',
    phone: '',
    resrvation_history: [],
    size: '',
    hall_number: '',
  };

  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public alertCtrl: AlertController,
    public navController: NavController
  ) {
    this.hallID = route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.userManagementService
      .getHall(this.hallID)
      .then((hall) => {
        this.hall = hall.data() as Hall;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteHall() {
    this.userManagementService.deleteHall(this.hallID).then(() => {
      this.alertCtrl.create({
        header: 'Success',
        message: 'Hall deleted successfully',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navController.navigateForward('/tabs/tab3');
            },
          },
        ],
      });
    });
  }
  updateHall() {
    this.navController.navigateForward('/update-hall/' + this.hallID);
  }
  viewHistory() {
    this.navController.navigateForward('/view-hall-history/' + this.hallID);
  }
}
