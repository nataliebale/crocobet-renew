import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SlotsMainContainerComponent,
  SlotsMainRouteContainerComponent,
  SlotsPlayRouteContainerComponent
} from './containers';
import { LoginGuard, NotVerifiedGuard } from '@crc/facade';

const routes: Routes = [
  {
    path: '',
    component: SlotsMainContainerComponent,
    children: [
      {
        path: '',
        component: SlotsMainRouteContainerComponent
      },
      {
        path: 'play',
        component: SlotsPlayRouteContainerComponent,
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
export class SlotsRoutingModule {}
