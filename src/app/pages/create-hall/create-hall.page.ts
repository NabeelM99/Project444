import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Hall } from 'src/app/services/user-management.service';
@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.page.html',
  styleUrls: ['./create-hall.page.scss'],
})
export class CreateHallPage {
  hall: Hall = {
    id: '',
    name: '',
    capacity: '',
    price: 0,
    description: '',
    location: '',
    image: '',
    available: true,
    email: '',
    noOfBoth: '',
    phone: '',
    resrvation_history: [],
    size: '',
    hall_number: '',
  };
  createHallForm!: FormGroup;
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController,
    public formBuilder: FormBuilder
  ) {
    this.createHallForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^[a-zA-Z\s-]+$/),
        ],
      ],
      capacity: [
        '',
        [Validators.required, Validators.pattern(/^\d+\s*-\s*\d+$/)],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9]\d{0,3}$/),
          Validators.max(5000),
          Validators.min(100),
        ],
      ],
      description: [''],
      location: [''],
      image: [
        '',
        [Validators.pattern(/^[a-zA-Z0-9\/.]+$/), Validators.maxLength(50)],
      ],
      email: ['', [Validators.required, Validators.email]],
      noOfBoth: [
        '',
        [Validators.required, Validators.pattern(/^\d+\s*-\s*\d+$/)],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      size: ['', [Validators.pattern(/^\d+x\d+$/)]],
      hall_number: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
    });
  }

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

  CreateHall(value: any) {
    // Fill the 'hall' variable with data from the form
    this.hall.name = value.name;
    this.hall.capacity = value.capacity;
    this.hall.price = +value.price; // Convert to number
    this.hall.description = value.description;
    this.hall.location = value.location;
    this.hall.image = value.image;
    this.hall.email = value.email;
    this.hall.noOfBoth = value.noOfBoth;
    this.hall.phone = value.phone;
    this.hall.size = value.size;
    this.hall.hall_number = value.hall_number;

    // Call the service method to create the hall
    this.userManagementService.createHall(this.hall).then((docRef) => {
      this.alertController
        .create({
          header: 'Success',
          message: 'Hall created successfully',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navController.navigateForward('/tabs/tab3');
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
    });
  }
}
