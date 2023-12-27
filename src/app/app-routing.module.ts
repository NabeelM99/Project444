import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'password-validator',
    loadChildren: () =>
      import('./pages/password-validator/password-validator.module').then(
        (m) => m.PasswordValidatorPageModule
      ),
  },
  {
    path: 'create-hall',
    loadChildren: () =>
      import('./pages/create-hall/create-hall.module').then(
        (m) => m.CreateHallPageModule
      ),
  },
  {
    path: 'view-hall/:id',
    loadChildren: () =>
      import('./pages/view-hall/view-hall.module').then(
        (m) => m.ViewHallPageModule
      ),
  },
  {
    path: 'update-hall/:id',
    loadChildren: () =>
      import('./pages/update-hall/update-hall.module').then(
        (m) => m.UpdateHallPageModule
      ),
  },
  {
    path: 'view-hall-history/:id',
    loadChildren: () =>
      import('./pages/view-hall-history/view-hall-history.module').then(
        (m) => m.ViewHallHistoryPageModule
      ),
  },
  {
    path: 'view-event/:id',
    loadChildren: () =>
      import('./pages/view-event/view-event.module').then(
        (m) => m.ViewEventPageModule
      ),
  },
  {
    path: 'message-replay/:id',
    loadChildren: () =>
      import('./pages/message-replay/message-replay.module').then(
        (m) => m.MessageReplayPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
