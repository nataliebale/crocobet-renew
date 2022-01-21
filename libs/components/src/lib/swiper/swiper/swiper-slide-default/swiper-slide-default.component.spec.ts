import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SwiperSlideDefaultComponent } from './swiper-slide-default.component';

describe('SwiperSlideDefaultComponent', () => {
  let spectator: Spectator<SwiperSlideDefaultComponent>;
  const createComponent = createComponentFactory(SwiperSlideDefaultComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
