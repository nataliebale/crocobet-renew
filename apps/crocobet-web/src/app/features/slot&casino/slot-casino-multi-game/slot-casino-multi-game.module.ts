import { NgModule } from '@angular/core';
import { ComponentsModule } from '@crc/components';
import { SharedTranslateModule, SharedModule } from '@crc/shared';

import { SlotCasinoMultiGameRoutingModule } from './slot-casino-multi-game-routing.module';
import { SlotCasinoSharedModule } from '../slot-casino-shared/slot-casino-shared.module';

import { containerComponents } from './containers';
import { presentationComponents } from './presentation';

@NgModule({
  imports: [
    SharedModule,
    SharedTranslateModule,
    ComponentsModule,
    SlotCasinoSharedModule,
    SlotCasinoMultiGameRoutingModule
  ],
  declarations: [containerComponents, presentationComponents]
})
export class SlotCasinoMultiGameModule {}
