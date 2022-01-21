import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UfoContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: UfoContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UfoRoutingModule {}
