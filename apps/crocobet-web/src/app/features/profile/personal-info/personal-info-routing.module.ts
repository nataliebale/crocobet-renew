import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalInfoContainerComponent } from './personal-info-container/personal-info-container.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInfoContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInfoRoutingModule {}
