import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordStatusPresentationComponent } from './reset-password-status-presentation/reset-password-status-presentation.component';
import { SharedTranslateModule } from '@crc/shared';

const components = [ResetPasswordStatusPresentationComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedTranslateModule],
  exports: [...components]
})
export class ResetPasswordStatusModule {}
