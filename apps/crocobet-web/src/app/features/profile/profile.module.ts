import { NgModule } from '@angular/core';

import { ProfileMenuFacadeModule } from '@crc/facade';
import { FormsModule, SharedModule, SharedTranslateModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';

import { ProfileRoutingModule } from './profile-routing.module';
import { FeaturesSharedModule } from '../shared';
import { DepositContainerComponent } from './containers/deposit-container/deposit-container.component';
import { DepositPresentationComponent } from './presentations/deposit-presentation/deposit-presentation.component';
import { DepositOtherPaymentsContainerComponent } from './presentations/deposit-presentation/containers/deposit-other-payments-container/deposit-other-payments-container.component';
import { ProfileComponent } from './profile.component';
import { ProfileSidebarComponent } from './sidebar/profile-sidebar.component';
import { DepositOtherPaymentsPresentationComponent } from './presentations/deposit-presentation/presentations/deposit-other-payments-presentation/deposit-other-payments-presentation.component';
import { DepositPaymentContainerComponent } from '../shared/containers/deposit/deposit-payment-container/deposit-payment-container.component';
import { DepositPaymentPresentationComponent } from '../shared/presentations/deposit/deposit-payment-presentation/deposit-payment-presentation.component';
import { ProfileContentTitleComponent } from './presentations/profile-content-title/profile-content-title.component';

const libModules = [SharedModule, ComponentsModule, SharedTranslateModule];
const facadeModules = [ProfileMenuFacadeModule];

const externalModules = [
  ProfileRoutingModule,
  FeaturesSharedModule,
  FormsModule
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSidebarComponent,

    DepositPaymentContainerComponent,
    DepositContainerComponent,
    DepositPresentationComponent,
    DepositOtherPaymentsContainerComponent,
    DepositOtherPaymentsPresentationComponent,
    DepositPaymentPresentationComponent
  ],
  imports: [...externalModules, ...libModules, ...facadeModules]
})
export class ProfileModule {}
