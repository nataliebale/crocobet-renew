import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';

import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { SharedTranslateModule } from './translate';

const internalModules = [PipesModule, SharedTranslateModule, DirectivesModule];

const externalModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ClipboardModule
];

@NgModule({
  exports: [...externalModules, ...internalModules]
})
export class SharedModule {}
