import { NgModule } from '@angular/core';

import { ComponentsModule } from '@crc/components';
import { SharedModule } from '@crc/shared';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live.component';

const components = [LiveComponent];
const externalModules = [SharedModule, ComponentsModule];

@NgModule({
  declarations: [...components],
  imports: [...externalModules, LiveRoutingModule]
})
export class LiveModule {}
