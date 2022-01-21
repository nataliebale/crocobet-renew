import { NgModule } from '@angular/core';

import { SharedModule } from '@crc/shared';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './containers/verification/verification.component';
import { VerificationNavComponent } from './presentations/verification-nav/verification-nav.component';
import { ProfileContentTitleModule } from '../presentations/profile-content-title/profile-content-title.module';

const components = [VerificationComponent, VerificationNavComponent];
const externalModules = [SharedModule, VerificationRoutingModule];

@NgModule({
  declarations: [...components],
  imports: [...externalModules, ProfileContentTitleModule]
})
export class VerificationModule {}
