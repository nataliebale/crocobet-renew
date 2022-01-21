import { NgModule } from '@angular/core';

import { VirtualRoutingModule } from './virtual-routing.module';
import { FeaturesSharedModule } from '../shared';
import { containerComponents } from './containers';
import { SharedModule, SharedTranslateModule } from '@crc/shared';
import { MainPageModule } from '../main-page/main-page.module';
import { presentationComponents } from './presentations';

const externalModules = [SharedModule, SharedTranslateModule];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  imports: [
    ...externalModules,
    VirtualRoutingModule,
    MainPageModule,
    FeaturesSharedModule
  ]
})
export class VirtualModule {}
