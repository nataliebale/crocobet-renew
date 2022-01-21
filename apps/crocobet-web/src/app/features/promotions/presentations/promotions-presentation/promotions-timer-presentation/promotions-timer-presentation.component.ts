import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { tap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BannerWithCountDown } from '../../../containers/promotions-container/bannerWithCountDown';

@UntilDestroy()
@Component({
  selector: 'crc-w-promotions-timer-presentation',
  templateUrl: './promotions-timer-presentation.component.html',
  styleUrls: ['./promotions-timer-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsTimerPresentationComponent {
  @Input() time: number;
  @Input() promotion: BannerWithCountDown;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    timer(1000, 1000)
      .pipe(
        untilDestroyed(this),
        tap((_) => (this.time = this.time - 1000)),
        tap((_) => this.changeDetectionRef.detectChanges())
      )
      .subscribe();
  }
}
