import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  CasinoMainContainerComponent,
  CasinoMainRouteContainerComponent,
  CasinoPlayRouteContainerComponent
} from './containers';
import { LoginGuard, NotVerifiedGuard } from '@crc/facade';

const routes: Routes = [
  {
    path: '',
    component: CasinoMainContainerComponent,
    children: [
      {
        path: '',
        component: CasinoMainRouteContainerComponent
      },
      {
        path: 'play',
        component: CasinoPlayRouteContainerComponent,
        canActivate: [LoginGuard, NotVerifiedGuard],
        data: {
          verification: {
            requireLogin: true
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasinoRoutingModule {}
