import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginGuard } from '@crc/facade';

import { SlotCasinoMultiPlayerContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SlotCasinoMultiPlayerContainerComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotCasinoMultiGameRoutingModule {}
