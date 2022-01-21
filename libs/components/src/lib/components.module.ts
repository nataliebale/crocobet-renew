import { NgModule } from '@angular/core';
import { SwiperModule } from './swiper';
import { CaptchaPromptModule } from './captcha-prompt';
import { FiltersModule } from './filters';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './game-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PopupComponent } from './popup';
import { ResetPasswordStatusModule } from './reset-password-status';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown.component';
import { LoadingComponent } from './loading/loading.component';
import { SelectModule } from './select';

const modules = [
  SwiperModule,
  CaptchaPromptModule,
  FiltersModule,
  ResetPasswordStatusModule,
  SelectModule
];

@NgModule({
  exports: [
    ...modules,
    SearchComponent,
    PopupComponent,
    TimerCountdownComponent,
    LoadingComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  declarations: [
    SearchComponent,
    PopupComponent,
    TimerCountdownComponent,
    LoadingComponent
  ]
})
export class ComponentsModule {}
