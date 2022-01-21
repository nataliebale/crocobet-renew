import { NgModule } from '@angular/core';
import { SharedModule } from '@crc/shared';
import { FacadeModule, <%= feature.className %>FacadeModule } from '@crc/facade';

import { <%= feature.className %>RoutingModule } from './<%= feature.fileName %>-routing.module';
import { <%= feature.className %>PresentationComponent } from './presentations';
import { <%= feature.className %>ContainerComponent } from './containers';

const containerComponents = [<%= feature.className %>ContainerComponent];
const presenterComponents = [<%= feature.className %>PresentationComponent];

const externalModules = [
  SharedModule,
  <%= feature.className %>RoutingModule,
  FacadeModule,
  <%= feature.className %>FacadeModule
];

@NgModule({
  declarations: [...containerComponents, ...presenterComponents],
  imports: [...externalModules]
})
export class <%= feature.className %>Module {}
