import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BannerFacade, BannerType } from '@crc/facade';
import { createImageSlide } from '@crc/components';
import { dayCountDueTo, timeLeftDueTo } from '@crc/shared';

import { BannerInfo } from '../../presentations/shared-banner-presentation/banner-info';

@Component({
  selector: 'crc-shared-banner-container',
  templateUrl: './shared-banner-container.component.html',
  styleUrls: ['./shared-banner-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedBannerContainerComponent implements OnInit {
  banners$: Observable<BannerInfo[]>;

  @Input() bannerType: BannerType;

  constructor(private readonly facade: BannerFacade) {}

  ngOnInit() {
    this.banners$ = this.facade.getBanners(this.bannerType).pipe(
      map((banners) =>
        banners.map(
          (banner) =>
            ({
              ...createImageSlide(banner.image, banner.href, banner.title),
              title: banner.title,
              desc: banner.desc,
              showCountDown: banner.activeCountdown && banner.active?.end,
              countdownDayCount: dayCountDueTo(banner.active?.end),
              countdownTime: timeLeftDueTo(banner.active?.end)
            } as BannerInfo)
        )
      )
    );
  }
}
