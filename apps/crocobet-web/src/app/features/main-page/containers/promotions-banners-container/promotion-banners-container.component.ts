import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { BannerFacade } from '@crc/facade';
import { createImageSlide, ImageSlide } from '@crc/components';

@Component({
  selector: 'crc-promotions-banners-container',
  templateUrl: './promotion-banners-container.component.html',
  styleUrls: ['./promotion-banners-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionBannersContainerComponent {
  @Input() customIcon?: string;

  banners$: Observable<ImageSlide[]>;

  constructor(private readonly facade: BannerFacade) {
    this.banners$ = this.facade.getBanners('promotions').pipe(
      switchMap((banners) =>
        from(banners).pipe(
          map((banner) =>
            createImageSlide(banner.image, banner.href, banner.title)
          ),
          toArray()
        )
      )
    );
  }
}
