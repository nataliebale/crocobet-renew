import { NgModule } from '@angular/core';
import { SharedModule } from '@crc/shared';
import { UfoFacadeModule } from '@crc/facade';

import { UfoRoutingModule } from './ufo-routing.module';
import { containerComponents } from './containers/ufo-container';
import { presentationComponents } from './presentations/ufo-presentation';

const externalModules = [SharedModule, UfoRoutingModule, UfoFacadeModule];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  imports: [...externalModules]
})
export class UfoModule {}
