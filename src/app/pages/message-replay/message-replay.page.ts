import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertButton, AlertController, NavController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
import { ActivatedRoute } from '@angular/router';
import { adminReply } from 'src/app/services/user-management.service';
@Component({
  selector: 'app-message-replay',
  templateUrl: './message-replay.page.html',
  styleUrls: ['./message-replay.page.scss'],
})
export class MessageReplayPage implements OnInit {
  messageID!: string;
  clientName: string = '';
  clientID!: string;
  headLine: string = '';
  replyMessageText!: string;
  replayMessageObject!: adminReply;

  // Create the form group
  replyForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public navController: NavController,
    private fb: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.messageID = this.route.snapshot.paramMap.get('id') as string;

    this.replyForm = this.fb.group({
      message: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          this.noSpecialCharsValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.userManagementService
      .getClientMessageByID(this.messageID)
      .then((message) => {
        if (message.exists()) {
          this.clientName = message.data()['ClientName'];
          this.headLine = message.data()['headline'];
          this.clientID = message.data()['senderID'];
        }
      });
  }

  noSpecialCharsValidator(control: any) {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialChars.test(control.value)) {
      return { specialChars: true };
    }
    return null;
  }

  sendReply(value: any) {
    console.log('WOKR');
    this.replayMessageObject = {
      clientID: this.clientID,
      message_headline: this.headLine,
      replay_message: value.message,
      messageID: this.messageID,
    };
    this.userManagementService
      .addReplyMessage(this.replayMessageObject)
      .then(() => {
        this.alertCtrl.create({
          header: 'Success',
          message: 'Message replayed successfully',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navController.navigateForward('/tabs/tab4');
              },
            },
          ],
        });
      });
  }
}
