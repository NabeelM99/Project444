import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import {
  UserManagementService,
  event,
  reservation,
} from 'src/app/services/user-management.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  resID: string = '';
  reservation: reservation = {
    id: '',
    clientID: '',
    start_date: '',
    end_date: '',
    eventID: '',
    hallID: '',
    start_time: '',
    end_time: '',
    total: 0,
    clientName: '',
    eventName: '',
  };

  newEvent: event = {
    id: '',
    name: '',
    agenda: '',
    attendance: [],
    description: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    speakers: '',
    reservationID: '',
    floor_plan: '',
    eventOrder: [],
    requests: [],
    hallName: '',
  };

  hallName!: string;

  eventForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public userManagmentService: UserManagementService,
    public navController: NavController,
    public alertController: AlertController
  ) {
    this.eventForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.compose([
            Validators.maxLength(255),
            Validators.pattern(/^[a-zA-Z0-9\s\-:,.]+$/),
          ]),
        ],
      ],
      speakers: [
        '',
        [
          Validators.required,
          Validators.compose([
            Validators.minLength(7),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z0-9./]+$/),
          ]),
        ],
      ],
      floorPlan: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9./]+$/)],
      ],
      agenda: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-:,.]+$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.reservation.id = this.route.snapshot.paramMap.get('id') as string;
    this.userManagmentService
      .getReservationByID(this.reservation.id)
      .then((reservation) => {
        if (reservation.exists()) {
          this.reservation = reservation.data() as reservation;
          this.resID = reservation.id;
          this.userManagmentService
            .getHallByID(this.reservation.hallID)
            .then((hall) => {
              if (hall.exists()) {
                this.hallName = hall.data()['name'];
              }
            });
        }
      });
  }

  createEvent(formCreate: any) {
    // full event object with necessary files
    this.newEvent = {
      name: formCreate.name,
      agenda: formCreate.agenda,
      attendance: [],
      description: formCreate.description,
      start_date: this.reservation.start_date,
      end_date: this.reservation.end_date,
      start_time: this.reservation.start_time,
      end_time: this.reservation.end_time,
      speakers: formCreate.speakers,
      reservationID: this.resID,
      floor_plan: formCreate.floorPlan,
      eventOrder: [
        'name',
        'description',
        'date-time',
        'agenda',
        'speakers',
        'floor-plan',
        'attendance',
      ],
      requests: [],
      hallName: this.hallName,
    };

    this.userManagmentService.addEvent(this.newEvent).then((value) => {
      this.userManagmentService
        .updateReservationByID(this.resID, {
          eventID: value.id,
          eventName: formCreate.name,
        })
        .then(() => {
          this.alertController
            .create({
              header: 'Success',
              message: 'Event created successfully',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navController.navigateForward('/tabs/tab6');
                  },
                },
              ],
            })
            .then((alert) => {
              alert.present();
            });
        });
    });
  }
}
