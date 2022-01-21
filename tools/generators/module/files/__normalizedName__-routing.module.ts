import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { <%= feature.className %>ContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: <%= feature.className %>ContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= feature.className %>RoutingModule {}
