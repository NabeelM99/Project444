import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageReplayPage } from './message-replay.page';

const routes: Routes = [
  {
    path: '',
    component: MessageReplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageReplayPageRoutingModule {}
