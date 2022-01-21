import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { tap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-shared-timer-countdown',
  templateUrl: './timer-countdown.component.html',
  styleUrls: ['./timer-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerCountdownComponent {
  @Input() time: number;

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
