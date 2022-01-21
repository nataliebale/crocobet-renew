import { NgModule } from '@angular/core';

import { SharedTranslateModule, SharedModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';

import { SlotsRoutingModule } from './slots-routing.module';
import { MainPageModule } from '../main-page/main-page.module';
import { FeaturesSharedModule } from '../shared';
import { SlotCasinoSharedModule } from '../slot&casino/slot-casino-shared/slot-casino-shared.module';
import { containerComponents } from './containers';
import { presentationComponents } from './presentations';

const libModules = [SharedModule, ComponentsModule, SharedTranslateModule];
const internalModules = [
  SlotCasinoSharedModule,
  FeaturesSharedModule,
  SlotsRoutingModule,
  MainPageModule
];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  imports: [...libModules, ...internalModules],
  providers: []
})
export class SlotsModule {}
