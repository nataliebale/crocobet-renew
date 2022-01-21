import { NgModule } from '@angular/core';
import {
  FormsModule as TemplateFormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false
};

const externalModules = [
  CommonModule,
  TemplateFormsModule,
  ReactiveFormsModule,
  NgxMaskModule.forRoot(maskConfig)
];

@NgModule({
  declarations: [components],
  imports: [...externalModules],
  exports: [...components]
})
export class FormsModule {}
