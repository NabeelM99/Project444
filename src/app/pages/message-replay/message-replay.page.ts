import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserManagementService } from 'src/app/services/user-management.service';
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

  // Create the form group
  replyForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public userManagementService: UserManagementService,
    public navController: NavController,
    private fb: FormBuilder
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

  sendReply() {
    // Add your logic to send the reply
  }
}
