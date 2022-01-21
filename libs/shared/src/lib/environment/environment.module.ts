import { ModuleWithProviders, NgModule } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from './environment.config';

@NgModule()
export class EnvironmentModule {
  static forRoot(
    config: EnvironmentConfig
  ): ModuleWithProviders<EnvironmentModule> {
    return {
      ngModule: EnvironmentModule,
      providers: [{ provide: ENV_CONFIG, useValue: config }]
    };
  }
}
