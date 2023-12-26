import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordValidatorPageRoutingModule } from './password-validator-routing.module';

import { PasswordValidatorPage } from './password-validator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordValidatorPageRoutingModule
  ],
  declarations: [PasswordValidatorPage]
})
export class PasswordValidatorPageModule {}
