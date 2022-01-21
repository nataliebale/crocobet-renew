import { NgModule } from '@angular/core';
import { SharedTranslateModule, SharedModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';
import { MainPageRoutingModule } from './main-page-routing.module';
import { presentationComponents } from './presentations';
import { containerComponents, exportedContainerComponents } from './containers';
import { FeaturesSharedModule } from '../shared';

const libModules = [SharedModule, ComponentsModule, SharedTranslateModule];

@NgModule({
  declarations: [...containerComponents, ...presentationComponents],
  exports: [...exportedContainerComponents],
  imports: [...libModules, MainPageRoutingModule, FeaturesSharedModule]
})
export class MainPageModule {}
