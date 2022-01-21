import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createImageSlide, ImageSlide } from '@crc/components';

@Component({
  selector: 'crc-demos-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent {
  images: ImageSlide[] = [
    createImageSlide(
      'https://static.crocobet.com/sliders/9a5420599e96a47047314e6b580ad9c5.jpg',
      'https://static.crocobet.com/sliders/9a5420599e96a47047314e6b580ad9c5.jpg'
    ),
    createImageSlide(
      'https://static.crocobet.com/sliders/3bee171473dafa34576524ae80231d0f.jpg'
    ),
    createImageSlide(
      'https://static.crocobet.com/sliders/5e795b4e88fcfc0c9a09251547b4d84f.jpg'
    ),
    createImageSlide(
      'https://static.crocobet.com/sliders/beb0fcafa7d5b4266edeed2ada2ec1b0.jpg'
    ),
    createImageSlide(
      'https://static.crocobet.com/sliders/9a5420599e96a47047314e6b580ad9c5.jpg'
    ),
    createImageSlide(
      'https://static.crocobet.com/sliders/3bee171473dafa34576524ae80231d0f.jpg'
    )
  ];
}
