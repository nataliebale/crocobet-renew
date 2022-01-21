import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerFacade, generatePromotionCategories } from '@crc/facade';
import { FilterItemView } from '@crc/components';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { dayCountDueTo, timeLeftDueTo } from '@crc/shared';
import { BannerWithCountDown } from './bannerWithCountDown';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-promotions-container',
  templateUrl: './promotions-container.component.html',
  styleUrls: ['./promotions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsContainerComponent {
  filteredItems: Observable<FilterItemView[]>;

  $filter = new BehaviorSubject<string>('');

  $promotions = this.facade.getBanners('promotions').pipe(
    switchMap((data) =>
      from(data).pipe(
        map((banner) => {
          return {
            ...banner,
            showCountDown: banner.activeCountdown && banner.active?.end,
            countdownDayCount: dayCountDueTo(banner.active?.end),
            countdownTime: timeLeftDueTo(banner.active?.end)
          } as BannerWithCountDown;
        }),
        toArray()
      )
    ),
    switchMap((data) =>
      this.$filter.pipe(
        map((filteredBy) =>
          filteredBy ? data.filter((d) => d.category === filteredBy) : data
        )
      )
    )
  );

  constructor(private readonly facade: BannerFacade) {
    this.filteredItems = of([
      generatePromotionCategories('prom_all', false, ''),
      generatePromotionCategories('prom_sports', false, 'sport'),
      generatePromotionCategories('prom_slots', false, 'slot'),
      generatePromotionCategories('prom_casino', false, 'casino'),
      generatePromotionCategories('UFO', false, 'ufo'),
      generatePromotionCategories('prom_poker', false, 'poker'),
      generatePromotionCategories('prom_games', false, 'p2p'),
      generatePromotionCategories('prom_other', false, 'other')
    ]).pipe(
      switchMap((data) =>
        this.$filter.pipe(
          map((category) =>
            data.map((d) => {
              return { ...d, active: d.filter === category };
            })
          )
        )
      )
    );
  }

  onSelectChange(str: string) {
    this.$filter.next(str);
  }
}
