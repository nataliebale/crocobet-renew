import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTranslateModule } from '@crc/shared';

import { FiltersComponent } from './filters/filters.component';

const components = [FiltersComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedTranslateModule],
  exports: [...components]
})
export class FiltersModule {}
