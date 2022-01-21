import { NgModule } from '@angular/core';

import { directives } from './directives';

@NgModule({
  declarations: directives,
  exports: directives
})
export class DirectivesModule {}
