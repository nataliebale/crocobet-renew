import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaPromptComponent } from './captcha-prompt/captcha-prompt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@crc/shared';

const components = [CaptchaPromptComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...components]
})
export class CaptchaPromptModule {}
