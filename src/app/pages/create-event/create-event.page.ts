import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  UserManagementService,
  reservation,
} from 'src/app/services/user-management.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  reservationID!: string;
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

  eventForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public userManagmentService: UserManagementService
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
    this.reservationID = this.route.snapshot.paramMap.get('id') as string;
    this.userManagmentService
      .getReservationByID(this.reservationID)
      .then((reservation) => {
        if (reservation.exists()) {
          this.reservation = reservation.data() as reservation;
          console.log(this.reservation);
        }
      });
  }

  createEvent(value: any) {
    // Implement your logic for creating an event here
  }
}
