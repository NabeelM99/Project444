import { Component, OnInit } from '@angular/core';
import {
  UserManagementService,
  guestRequest,
  request,
  reservation,
} from '../services/user-management.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Client } from '../services/user-management.service';
import { Firestore } from '@angular/fire/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
})
export class Tab6Page {
  clientID!: string;
  pendingRequests: request[] = [];
  approveReqeusts: request[] = [];
  rejectRequests: request[] = [];
  eventRequsts: guestRequest[] = [];

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

  client: Client = {
    id: '',
    username: '',
    password: '',
    approve_request: [],
    reject_request: [],
    pending_requests: [],
    profile_image: '',
    events: [],
    event_requests: [],
    message_replay: [],
    user_type: '',
  };

  hallPrice!: number;
  constructor(
    public userManagementService: UserManagementService,
    public alertController: AlertController,
    public navController: NavController,
    public firestore: Firestore
  ) {}

  ionViewWillEnter() {
    this.initializePage();
  }

  private async initializePage() {
    this.pendingRequests = [];
    this.approveReqeusts = [];
    this.rejectRequests = [];
    this.eventRequsts = [];
    if (this.userManagementService.userID) {
      this.clientID = this.userManagementService.userID;
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
    // to fill client observable
    await this.userManagementService.getClientReservatoinByClientID(
      this.clientID
    );

    this.client = await this.userManagementService.getClient(this.clientID);
    console.log('inside intit', this.client.pending_requests);

    this.client.pending_requests.forEach((requestID) => {
      this.userManagementService
        .getRequestByID(requestID)
        .then(async (request) => {
          console.log(request);
          const data = await request.data();
          if (data) {
            this.pendingRequests.push(data as request);
          }
          console.log(this.pendingRequests);
        });
    });

    this.client.approve_request.forEach((requestID) => {
      this.userManagementService
        .getRequestByID(requestID)
        .then(async (request) => {
          const data = await request.data();
          if (data) {
            if (data['status'] === 'approve') {
              this.approveReqeusts.push(data as request);
            }
          }
        });
    });

    this.client.reject_request.forEach((requestID) => {
      this.userManagementService
        .getRequestByID(requestID)
        .then(async (request) => {
          const data = await request.data();
          if (data) {
            if (data['status'] === 'reject') {
              this.rejectRequests.push(data as request);
            }
          }
        });
    });

    this.userManagementService.clientHallReservations$.subscribe(
      (reservations) => {
        reservations.forEach((reservation) => {
          this.userManagementService
            .getEventByID(reservation.eventID)
            .then((event) => {
              const data = event.data();
              if (data) {
                // Fetch every request into its form and then push it to event requests
                for (const requestId of data['requests']) {
                  this.userManagementService
                    .getRequestByID(requestId)
                    .then((request) => {
                      const requestData = request.data();
                      if (requestData) {
                        // Include the request ID along with the data
                        if (requestData['status'] === 'pending') {
                          this.eventRequsts.push({
                            id: requestId,
                            ...requestData,
                          } as guestRequest);
                          console.log('event Requests: ', this.eventRequsts);
                        }
                      }
                    });
                }
              }
            });
        });
      }
    );
  }

  //create event logic must be added
  async createEvent(approveRequest: request) {
    // hall price per day
    // crate new resrvation with information get it from create event
    // send resrvation id to the new page then in this page create event information and asign it to this reservation
    const isReserved =
      await this.userManagementService.getReservationByDatesAndHallID(
        approveRequest.start_date,
        approveRequest.end_date,
        approveRequest.hallID,
        this.clientID
      );

    if (isReserved.size > 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'This hall is already reserved',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.userManagementService
      .getHallByID(approveRequest.hallID)
      .then((hall) => {
        const data = hall.data();
        if (data) {
          this.hallPrice = data['price'];
          //calculate total price
          const start = new Date(approveRequest.start_date);
          const end = new Date(approveRequest.end_date);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          const total = diffDays * this.hallPrice;

          let newReservation: reservation = {
            clientID: this.clientID,
            start_date: approveRequest.start_date,
            end_date: approveRequest.end_date,
            eventID: '',
            hallID: approveRequest.hallID,
            start_time: approveRequest.start_time,
            end_time: approveRequest.end_time,
            total: total,
            clientName: this.client.username,
            eventName: '',
          };
          this.userManagementService
            .addResrvation(newReservation)
            .then((res) => {
              this.navController.navigateForward('/create-event/' + res.id);
            })
            .catch((err) => {
              console.log('Reservation Creation Error', err);
            });
        }
      });
  }
  approveGuesttRequest(approveRequest: guestRequest) {
    if (
      approveRequest.guestID !== undefined &&
      approveRequest.guestID !== null
    ) {
      this.userManagementService
        .updateRequestStatusByID(approveRequest.id, 'approve')
        .then(() => {
          this.userManagementService.updateEventByID(approveRequest.eventID, {
            attendance: arrayUnion(approveRequest.guestID),
            requests: arrayRemove(approveRequest.guestID),
          });

          this.alertController
            .create({
              header: 'Success',
              message: 'Request approved successfully',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });

          // Remove the approved request from the eventRequsts array
          const index = this.eventRequsts.findIndex(
            (r) => r.id === approveRequest.id
          );
          if (index !== -1) {
            this.eventRequsts.splice(index, 1);
          }
        });
    }
  }

  rejectGuestRequest(rejectRequest: guestRequest) {
    this.userManagementService
      .updateRequestStatusByID(rejectRequest.id, 'reject')
      .then(() => {
        this.userManagementService.updateEventByID(rejectRequest.eventID, {
          requests: arrayRemove(rejectRequest.guestID),
        });

        this.alertController
          .create({
            header: 'Success',
            message: 'Request rejected successfully',
            buttons: ['OK'],
          })
          .then((alert) => {
            this.alertController
              .create({
                header: 'Success',
                message: 'Request approved successfully',
                buttons: ['OK'],
              })
              .then((alert) => {
                alert.present();
              });
          });

        // Remove the rejected request from the eventRequsts array
        const index = this.eventRequsts.findIndex(
          (r) => r.id === rejectRequest.id
        );
        if (index !== -1) {
          this.eventRequsts.splice(index, 1);
        }
      });
  }
}
