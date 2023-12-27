import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MessageReplayPageRoutingModule } from './message-replay-routing.module';

import { MessageReplayPage } from './message-replay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageReplayPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MessageReplayPage],
})
export class MessageReplayPageModule {}
