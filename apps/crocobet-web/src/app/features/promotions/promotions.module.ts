import { NgModule } from '@angular/core';
import { SharedModule } from '@crc/shared';

import { PromotionsRoutingModule } from './promotions-routing.module';
import {
  PromotionsPresentationComponent,
  PromotionsTimerPresentationComponent
} from './presentations';
import { PromotionsContainerComponent } from './containers';
import { ComponentsModule } from '@crc/components';
import { TranslateModule } from '@ngx-translate/core';

const containerComponents = [PromotionsContainerComponent];
const presenterComponents = [
  PromotionsPresentationComponent,
  PromotionsTimerPresentationComponent
];

const libModules = [ComponentsModule];
const externalModules = [SharedModule, PromotionsRoutingModule];

@NgModule({
  declarations: [...containerComponents, ...presenterComponents],
  imports: [...externalModules, ...libModules, TranslateModule]
})
export class PromotionsModule {}
