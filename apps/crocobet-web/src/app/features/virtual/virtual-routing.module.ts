import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: VirtualContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualRoutingModule {}
