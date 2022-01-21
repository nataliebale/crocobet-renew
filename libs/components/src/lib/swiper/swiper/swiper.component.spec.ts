import { SwiperComponent } from './swiper.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('SwiperComponent', () => {
  const createComponent = createComponentFactory({
    component: SwiperComponent,
    shallow: true
  });

  it('should create the SwiperComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
