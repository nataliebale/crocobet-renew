import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthFacadeModule, FacadeModule } from '@crc/facade';
import {
  AnimationsModule,
  EnvironmentModule,
  SharedModule,
  TranslateModule
} from '@crc/shared';

import { FeaturesSharedModule } from './features/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { envConfig } from './environment-config';

const facadeModules = [FacadeModule, AuthFacadeModule];
const libModules = [
  SharedModule,
  TranslateModule,
  AnimationsModule,
  EnvironmentModule.forRoot(envConfig)
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FeaturesSharedModule,
    ...facadeModules,
    ...libModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
