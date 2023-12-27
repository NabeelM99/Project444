import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Hall,
  UserManagementService,
  reservation,
} from 'src/app/services/user-management.service';

@Component({
  selector: 'app-view-hall-history',
  templateUrl: './view-hall-history.page.html',
  styleUrls: ['./view-hall-history.page.scss'],
})
export class ViewHallHistoryPage implements OnInit {
  public hallID: string = '';
  reservations: reservation[] = []; // Initialize the array
  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService
  ) {
    this.hallID = route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.userManagementService
      .getHallHistory(this.hallID)
      .then((doc) => {
        if (doc.exists()) {
          const hallData = doc.data();
          const reservationHistory = hallData['reservation_history'] || [];
          console.log(reservationHistory);
          reservationHistory.forEach(async (element: string) => {
            const data = await this.userManagementService.getReservationByID(
              element
            );
            this.reservations.push(data.data() as reservation);
          });
        } else {
          console.log('Document not found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
