import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateHallPageRoutingModule } from './update-hall-routing.module';

import { UpdateHallPage } from './update-hall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateHallPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UpdateHallPage],
})
export class UpdateHallPageModule {}
