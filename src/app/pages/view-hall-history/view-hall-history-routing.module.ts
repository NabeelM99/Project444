import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewHallHistoryPage } from './view-hall-history.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHallHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewHallHistoryPageRoutingModule {}
