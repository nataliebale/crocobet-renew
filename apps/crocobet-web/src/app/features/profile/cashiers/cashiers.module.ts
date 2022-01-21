import { NgModule } from '@angular/core';

import { CashiersRoutingModule } from './cashiers-routing.module';
import { CashiersComponent } from './cashiers-containers/cashiers/cashiers.component';
import { SharedModule } from '@crc/shared';
import { ProfileModule } from '../profile.module';
import { ProfileContentTitleModule } from '../presentations/profile-content-title/profile-content-title.module';
import { CashiersPresentationComponent } from './cashiers-presentation/cashiers-presentation/cashiers-presentation.component';
import { CashierItemPresentationComponent } from './cashiers-presentation/cashier-item-presentation/cashier-item-presentation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

const components = [
  CashiersComponent,
  CashiersPresentationComponent,
  CashierItemPresentationComponent
];
const externalModules = [SharedModule, CashiersRoutingModule];

@NgModule({
  declarations: [...components],
  imports: [
    ...externalModules,
    ProfileModule,
    ProfileContentTitleModule,
    NgSelectModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ]
})
export class CashiersModule {}
