import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './containers/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
    children: [
      {
        path: '',
        redirectTo: 'live'
      },
      {
        path: 'live',
        pathMatch: 'full',
        loadChildren: () =>
          import('./containers/live/live.module').then((m) => m.LiveModule)
      },
      {
        path: 'selfie',
        loadChildren: () =>
          import('./containers/selfie/selfie.module').then(
            (m) => m.SelfieModule
          )
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./containers/chat/chat.module').then((m) => m.ChatModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule {}
