import { NgModule } from '@angular/core';
import { SharedModule } from '@crc/shared';
import { PokerFacadeModule } from '@crc/facade';
import { TranslateModule } from '@ngx-translate/core';

import { PokerRoutingModule } from './poker-routing.module';
import { PokerPresentationComponent } from './presentations';
import { PokerContainerComponent } from './containers';
import { MainPageModule } from '../main-page/main-page.module';
import { FeaturesSharedModule } from '../shared';
import { NgxMaskModule } from 'ngx-mask';

const containerComponents = [PokerContainerComponent];
const presenterComponents = [PokerPresentationComponent];

const externalModules = [
  SharedModule,
  PokerRoutingModule,
  PokerFacadeModule,
  MainPageModule,
  FeaturesSharedModule
];

@NgModule({
  declarations: [...containerComponents, ...presenterComponents],
  imports: [...externalModules, TranslateModule, NgxMaskModule]
})
export class PokerModule {}
