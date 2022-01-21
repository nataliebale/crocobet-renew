import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfieComponent } from './selfie.component';

const routes: Routes = [{ path: '', component: SelfieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfieRoutingModule {}
