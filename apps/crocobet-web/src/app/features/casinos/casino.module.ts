import { NgModule } from '@angular/core';

import { SharedTranslateModule, SharedModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';

import { CasinoRoutingModule } from './casino-routing.module';
import { MainPageModule } from '../main-page/main-page.module';
import { FeaturesSharedModule } from '../shared';
import { SlotCasinoSharedModule } from '../slot&casino/slot-casino-shared/slot-casino-shared.module';
import { containerComponents } from './containers';

const internalModules = [
  CasinoRoutingModule,
  FeaturesSharedModule,
  MainPageModule,
  SlotCasinoSharedModule
];

const libModules = [SharedModule, ComponentsModule, SharedTranslateModule];

@NgModule({
  declarations: [...containerComponents],
  imports: [...internalModules, ...libModules],
  providers: []
})
export class CasinoModule {}
