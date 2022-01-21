import { SwiperSettings } from './types';

export const defaultSwiperSettings: SwiperSettings = {
  view: 'single',
  autoPlay: {
    delay: 5000,
    disableOnInteraction: false
  },
  header: false,
  loop: true,
  navigation: { single: false, grid: true },
  pagination: { single: true, grid: false },
  slidesPerView: 1,
  switcher: false,
  dragSwipe: true
};
