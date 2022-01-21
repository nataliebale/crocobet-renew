import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { PersonalData, VerificationStatus } from '@crc/facade';
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  of,
  Subject,
  switchMap,
  take,
  tap,
  timer
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-header-balance-presentation',
  templateUrl: './header-balance-presentation.component.html',
  styleUrls: ['./header-balance-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBalancePresentationComponent implements OnChanges {
  @Input() isBalanceVisible: boolean;
  @Input() personalData: PersonalData;
  @Input() verificationStatus: VerificationStatus | undefined;

  @Output() toggleBalance$: EventEmitter<void> = new EventEmitter();

  VerificationStatus = VerificationStatus;
  balance$ = new BehaviorSubject<number>(-0.00001);
  newBalance$ = new Subject<number>();

  constructor() {
    this.handleBalanceUpdate();
  }

  toggleBalance() {
    if (
      this.verificationStatus === VerificationStatus.VERIFIED ||
      this.verificationStatus ===
        VerificationStatus.UNVERIFIED_REGISTERED_AFTER_JANUARY
    ) {
      this.toggleBalance$.emit();
    }
  }

  handleBalanceUpdate() {
    this.newBalance$
      .pipe(distinctUntilChanged())
      .pipe(
        switchMap((newBalance: number) => {
          if (this.balance$.value >= 0) {
            const totalTime = 500;
            const diff = Math.floor(
              Math.abs(newBalance - this.balance$.value) * 100
            );
            const interval = Math.ceil(totalTime / diff);
            const step = Math.ceil(diff / totalTime);

            return timer(0, interval).pipe(
              untilDestroyed(this),
              take(Math.floor(totalTime / interval)),
              tap((time) => {
                if (Math.abs(this.balance$.value - newBalance) <= step / 100) {
                  this.balance$.next(newBalance);
                } else {
                  if (this.balance$.value < newBalance) {
                    this.balance$.next(
                      Math.round((this.balance$.value + step / 100) * 100) / 100
                    );
                  } else {
                    this.balance$.next(
                      Math.round((this.balance$.value - step / 100) * 100) / 100
                    );
                  }
                }
              }),
              finalize(() => {
                this.balance$.next(newBalance);
              })
            );
          } else {
            this.balance$.next(newBalance);
            return of({});
          }
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.personalData?.currentValue) {
      this.newBalance$.next(changes.personalData.currentValue.accountBalance);
    }
  }
}
