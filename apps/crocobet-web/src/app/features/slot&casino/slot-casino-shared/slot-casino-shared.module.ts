import { NgModule } from '@angular/core';
import { ComponentsModule } from '@crc/components';
import { SharedTranslateModule, SharedModule } from '@crc/shared';

import { slotPresentationComponents, slotsContainerComponents } from './slot';

import {
  casinoContainerComponents,
  casinoPresentationComponents
} from './casino';
import { sharedContainerComponents } from './shared/containers';
import { sharedPresentationComponents } from './shared/presentations';

@NgModule({
  imports: [SharedModule, SharedTranslateModule, ComponentsModule],
  declarations: [
    ...sharedContainerComponents,
    ...sharedPresentationComponents,
    ...slotPresentationComponents,
    ...slotsContainerComponents,
    ...casinoContainerComponents,
    ...casinoPresentationComponents
  ],
  exports: [
    ...sharedContainerComponents,
    ...slotsContainerComponents,
    ...casinoContainerComponents,
    ...slotPresentationComponents
  ]
})
export class SlotCasinoSharedModule {}
