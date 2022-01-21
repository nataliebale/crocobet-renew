import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PromotionsContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PromotionsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule {}
