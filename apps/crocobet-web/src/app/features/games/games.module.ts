import { NgModule } from '@angular/core';
import { SharedTranslateModule, SharedModule } from '@crc/shared';

import { GamesRoutingModule } from './games-routing.module';
import { containerComponents } from './containers';
import { MainPageModule } from '../main-page/main-page.module';
import { presentationComponents } from './presentations';
import { FeaturesSharedModule } from '../shared';
import { NgxMaskModule } from 'ngx-mask';

const externalModules = [SharedModule, SharedTranslateModule];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  imports: [
    ...externalModules,
    GamesRoutingModule,
    MainPageModule,
    FeaturesSharedModule,
    NgxMaskModule
  ]
})
export class GamesModule {}
