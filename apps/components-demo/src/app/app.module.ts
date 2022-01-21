import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperModule } from '@crc/components';

@NgModule({
  declarations: [AppComponent, SwiperComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'swiper'
        },
        {
          path: 'swiper',
          component: SwiperComponent
        }
      ],
      {
        initialNavigation: 'enabledBlocking'
      }
    ),
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
