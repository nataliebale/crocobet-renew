import { NgModule } from '@angular/core';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [NgxTranslateModule],
  imports: [NgxTranslateModule]
})
export class SharedTranslateModule {}
