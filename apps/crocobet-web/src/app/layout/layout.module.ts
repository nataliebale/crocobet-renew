import { NgModule } from '@angular/core';

import { MenuFacadeModule, PromotionFacadeModule } from '@crc/facade';
import { ComponentsModule } from '@crc/components';
import { FormsModule, SharedModule } from '@crc/shared';

import { presentationComponents } from './presentations';
import { containerComponents } from './containers';

import { LayoutRoutingModule } from './layout-routing.module';
import { FooterContainerComponent } from './containers/footer-container/footer-container.component';
import { FeaturesSharedModule } from '../features/shared';

const facadeModules = [PromotionFacadeModule, MenuFacadeModule];
const libModules = [SharedModule, ComponentsModule, FormsModule];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  exports: [FooterContainerComponent],
  imports: [
    ...libModules,
    ...facadeModules,
    FeaturesSharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule {}
