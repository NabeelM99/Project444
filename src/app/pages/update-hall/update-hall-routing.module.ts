import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateHallPage } from './update-hall.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateHallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateHallPageRoutingModule {}
