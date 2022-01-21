import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageSlide } from '@crc/components';

@Component({
  selector: 'crc-promotions-banners-presentation',
  templateUrl: './promotions-banners-presentation.component.html',
  styleUrls: ['./promotions-banners-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsBannersPresentationComponent {
  @Input() banners: ImageSlide[];
  @Input() customIcon?: string;
}
