import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule as SwiperJsModule } from 'swiper/angular';

import { SwiperComponent } from './swiper/swiper.component';
import { SwiperSlideDefaultComponent } from './swiper/swiper-slide-default/swiper-slide-default.component';

const components = [SwiperComponent, SwiperSlideDefaultComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SwiperJsModule, RouterModule],
  exports: [...components]
})
export class SwiperModule {}
