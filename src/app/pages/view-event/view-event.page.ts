import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UserManagementService,
  event,
  Guest,
} from 'src/app/services/user-management.service';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  eventID!: string;
  event: event = {
    name: '',
    agenda: '',
    attendance: [],
    description: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    speakers: [],
    reservationID: '',
    floor_plan: '',
    eventOrder: [],
    requests: [],
    hallName: '',
  };

  attendance: string[] = []; // Initialize the array here
  constructor(
    public route: ActivatedRoute,
    public navController: NavController,
    public userManagementService: UserManagementService
  ) {
    this.eventID = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    this.userManagementService.getEventByID(this.eventID).then((event) => {
      this.event = event.data() as event;
      this.event.attendance.forEach((guestID: string) => {
        this.userManagementService.getGuestByID(guestID).then(async (guest) => {
          // Use square bracket notation to access 'name'
          const data = await guest.data();
          if (data) this.attendance.push(data['username']);
        });
      });
    });
  }

  goBack() {
    this.navController.navigateBack('/tabs/tab1');
  }
}
