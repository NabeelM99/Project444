// update-hall.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Hall } from 'src/app/services/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-hall',
  templateUrl: './update-hall.page.html',
  styleUrls: ['./update-hall.page.scss'],
})
export class UpdateHallPage implements OnInit {
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

  formUpdate!: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public alertCtrl: AlertController,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.hallID = route.snapshot.paramMap.get('id')!;
    this.formUpdate = this.formBuilder.group({
      name: [
        this.hall.name,
        [Validators.required, Validators.pattern(/^[a-zA-Z\s-]+$/)],
      ],
      location: [this.hall.location, [Validators.required]],
      email: [this.hall.email, [Validators.required, Validators.email]],
      phone: [
        this.hall.phone,
        [Validators.required, Validators.pattern(/^\d{8}$/)],
      ],
      description: [this.hall.description],
      capacity: [
        this.hall.capacity,
        [Validators.required, Validators.pattern(/^\d+\s*-\s*\d+$/)],
      ],
      size: [this.hall.size, [Validators.pattern(/^\d+x\d+$/)]],
      image: [
        this.hall.image,
        [Validators.pattern(/^[a-zA-Z0-9\/.]+$/), Validators.maxLength(50)],
      ],
      noOfBoth: [
        this.hall.noOfBoth,
        [Validators.required, Validators.pattern(/^\d+\s*-\s*\d+$/)],
      ],
      price: [
        this.hall.price,
        [
          Validators.pattern(/^[1-9]\d{0,3}$/),
          Validators.max(5000),
          Validators.min(100),
        ],
      ],
      hall_number: [
        this.hall.hall_number,
        [Validators.required, Validators.pattern(/^\d{1,5}$/)],
      ],
    });
  }

  ngOnInit() {
    this.userManagementService
      .getHall(this.hallID)
      .then((hall) => {
        this.hall = hall.data() as Hall;
        // Update the form values based on the retrieved hall data
        this.formUpdate.patchValue({
          name: this.hall.name,
          location: this.hall.location,
          email: this.hall.email,
          phone: this.hall.phone,
          description: this.hall.description,
          capacity: this.hall.capacity,
          size: this.hall.size,
          image: this.hall.image,
          noOfBoth: this.hall.noOfBoth,
          price: this.hall.price,
          hall_number: this.hall.hall_number,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async UpdateHall(value: any) {
    // Implement the logic to update the hall
    try {
      // Use the userManagementService to update the hall data
      await this.userManagementService.updateHall(this.hallID, value);

      // Show success alert
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Hall updated successfully',
        buttons: ['OK'],
      });

      await alert.present();

      // Navigate back to the view-hall page or any other desired page
      this.router
        .navigateByUrl('/tabs/tab3', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/view-hall/' + this.hallID]);
        });
    } catch (error) {
      // Handle error and show alert if necessary
      console.error('Error updating hall:', error);

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Failed to update hall. Please try again.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
