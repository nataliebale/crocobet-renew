import { NgModule } from '@angular/core';

import { SharedModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';

import { SelfieRoutingModule } from './selfie-routing.module';
import { SelfieComponent } from './selfie.component';

const components = [SelfieComponent];
const externalModules = [SharedModule, ComponentsModule];

@NgModule({
  declarations: [...components],
  imports: [...externalModules, SelfieRoutingModule]
})
export class SelfieModule {}
