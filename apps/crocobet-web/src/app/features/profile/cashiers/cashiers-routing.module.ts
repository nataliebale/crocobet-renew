import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashiersComponent } from './cashiers-containers/cashiers/cashiers.component';

const routes: Routes = [{ path: '', component: CashiersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashiersRoutingModule {}
