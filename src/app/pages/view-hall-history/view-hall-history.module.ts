import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHallHistoryPageRoutingModule } from './view-hall-history-routing.module';

import { ViewHallHistoryPage } from './view-hall-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewHallHistoryPageRoutingModule
  ],
  declarations: [ViewHallHistoryPage]
})
export class ViewHallHistoryPageModule {}
