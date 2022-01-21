import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GamesContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: GamesContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
