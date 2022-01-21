import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CashierPlace } from '@crc/facade';
import { CashierWeekdays } from '../../entity/weekday.enum';
import { HolidayTypes } from '../../entity/holiday.enum';
import {
  getCashierState,
  getException,
  getHolidayType,
  getMinutesBeforeClosing
} from '../../utils/cashiers.utils';
import { OpenStatus } from '../../entity/open-status.enum';

@Component({
  selector: 'crc-w-cashier-item-presentation',
  templateUrl: './cashier-item-presentation.component.html',
  styleUrls: ['./cashier-item-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashierItemPresentationComponent implements OnInit, OnDestroy {
  private closesInInterval: NodeJS.Timeout;
  @Input() cashier: CashierPlace;
  @Input() selected: boolean;

  @Output() cashierSelected$: EventEmitter<CashierPlace | null> =
    new EventEmitter<CashierPlace | null>();

  CashierWeekdays = CashierWeekdays;
  HolidayTypes = HolidayTypes;
  OpenStatus = OpenStatus;

  openStatus: OpenStatus;
  closesInMinutes: string;
  workingHours = '';
  exceptionTime = '';
  holidayType: HolidayTypes = HolidayTypes.None;
  exception: CashierWeekdays = null;

  private setWorkingHours(cashier: CashierPlace) {
    if (cashier.openHours) {
      const generalHours = cashier.openHours.find(
        (hours) => hours.weekday === CashierWeekdays.AllWeek
      );
      this.workingHours = generalHours
        ? `${generalHours.from} - ${generalHours.until}`
        : '';
    }
    this.holidayType = getHolidayType(cashier);
  }

  private setExceptions(cashier: CashierPlace) {
    this.exception = getException(cashier);

    if (this.exception) {
      const exceptionTime = cashier.openHours.find(
        (hours) => hours.weekday === this.exception
      );
      this.exceptionTime = `${exceptionTime.from} - ${exceptionTime.until}`;
    }
  }

  private setCashierState(cashier: CashierPlace) {
    this.openStatus = getCashierState(cashier);

    if (this.openStatus === OpenStatus.ClosesSoon) {
      this.closesInMinutes = getMinutesBeforeClosing(cashier);
      this.closesInInterval = setInterval(() => {
        this.closesInMinutes = getMinutesBeforeClosing(cashier);
        this.cdr.markForCheck();
      }, 1000 * 60);
    }
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setCashierState(this.cashier);
    this.setWorkingHours(this.cashier);
    this.setExceptions(this.cashier);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    clearInterval(this.closesInInterval);
  }

  onCashierSelected() {
    this.cashierSelected$.emit(this.selected ? null : this.cashier);
  }
}
