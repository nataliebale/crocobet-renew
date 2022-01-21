import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: RegisterContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
