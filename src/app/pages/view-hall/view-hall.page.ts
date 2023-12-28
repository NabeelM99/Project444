import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Hall } from 'src/app/services/user-management.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { request } from 'src/app/services/user-management.service';
export interface startEndDate {
  start_date: string;
  end_date: string;
}
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

  minDate!: string;

  requestForm!: FormGroup;

  userType!: string;

  reservationTimes!: startEndDate[];
  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public alertCtrl: AlertController,
    public navController: NavController,
    public formBuilder: FormBuilder
  ) {
    this.hallID = route.snapshot.paramMap.get('id')!;
    this.requestForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userType = this.userManagementService.userType;
    this.userManagementService
      .getHall(this.hallID)
      .then((hall) => {
        this.hall = hall.data() as Hall;

        // Set minimum date to the current date
        const today = new Date();
        this.minDate = today.toISOString();

        // Initialize reservationTimes array
        this.reservationTimes = [];

        // Get all reservations of this hall
        this.userManagementService
          .getReservationOfHall(this.hallID)
          .then((reservations) => {
            reservations.forEach((reservation) => {
              this.reservationTimes.push({
                start_date: new Date(
                  reservation.data()['start_date']
                ).toISOString(),
                end_date: new Date(
                  reservation.data()['end_date']
                ).toISOString(),
              });
            });
          });
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

  // this will execute it if client request is clicked
  clientRequest(requestData: any) {
    const selectedStartDate = new Date(requestData.startDate);
    const selectedEndDate = new Date(requestData.endDate);

    // Check if the selected end date is earlier than the start date
    if (selectedEndDate < selectedStartDate) {
      // Display an alert notifying the user that the period is invalid
      this.showInvalidPeriodAlert();
      return; // Exit the method early
    }

    // Format dates as MM/DD/YYYY strings
    const formattedStartDate = selectedStartDate.toLocaleDateString('en-US');
    const formattedEndDate = selectedEndDate.toLocaleDateString('en-US');

    // Check if the selected dates overlap with any reserved period
    const overlap = this.reservationTimes.some((reservation) => {
      const reservationStartDate = new Date(reservation.start_date);
      const reservationEndDate = new Date(reservation.end_date);

      return (
        selectedStartDate <= reservationEndDate &&
        selectedEndDate >= reservationStartDate
      );
    });

    if (overlap) {
      // Display an alert notifying the user that the hall is already reserved
      this.showReservationAlert();
    } else {
      // Extract the start time and end time from the form data
      const startTime = selectedStartDate.toLocaleTimeString();
      const endTime = selectedEndDate.toLocaleTimeString();

      // Get client information
      this.userManagementService
        .getClientByID(this.userManagementService.userID)
        .then((client) => {
          if (client.exists()) {
            // Initialize the request object inside the 'else' block
            const clientName = client.data()['username'];
            const newRequest: request = {
              clientID: this.userManagementService.userID,
              end_date: formattedEndDate,
              start_date: formattedStartDate,
              hallName: this.hall.name,
              hallID: this.hallID,
              status: 'pending',
              user_type: 'client',
              clientName: clientName,
              start_time: startTime,
              end_time: endTime,
            };

            // Create a new request and add it to the database
            this.userManagementService
              .addRequest(newRequest)
              .then(() => {
                // Display success alert and navigate
                this.alertCtrl
                  .create({
                    header: 'Success',
                    message: 'Request submitted successfully',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          this.reservationTimes.push({
                            start_date: formattedStartDate,
                            end_date: formattedEndDate,
                          });
                          this.navController.navigateForward('/tabs/tab6');
                        },
                      },
                    ],
                  })
                  .then((alert) => alert.present());
              })
              .catch((error) => {
                console.error('Error adding request to the database:', error);
                // Handle error, e.g., display an error alert
              });
          }
        })
        .catch((error) => {
          console.error('Error getting client information:', error);
          // Handle error, e.g., display an error alert
        });
    }
  }

  async showInvalidPeriodAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Invalid Period',
      message:
        'Please select an end date that is equal to or later than the start date.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showReservationAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'The hall is already reserved during this period.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
