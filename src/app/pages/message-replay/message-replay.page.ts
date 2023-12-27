import { Component, OnInit } from '@angular/core';
import { IonProgressBar, NavController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-replay',
  templateUrl: './message-replay.page.html',
  styleUrls: ['./message-replay.page.scss'],
})
export class MessageReplayPage implements OnInit {
  messageID!: string;
  clientName: string = '';
  headLine: string = '';
  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public alertCtrl: AlertController,
    public navController: NavController
  ) {
    this.messageID = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.userManagementService
      .getClientMessageByID(this.messageID)
      .then((message) => {
        if (message.exists()) {
          this.clientName = message.data()['ClientName'];
          this.headLine = message.data()['headline'];
        }
      });
  }
}
