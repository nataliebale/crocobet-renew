import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PokerContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PokerContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokerRoutingModule {}
