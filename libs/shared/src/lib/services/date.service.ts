/* tslint:disable */

import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/date.utils';
import { LanguageFacade } from '../translate/services/language.facade';

enum Months {
  'January' = '01',
  'February' = '02',
  'March' = '03',
  'April' = '04',
  'May' = '05',
  'June' = '06',
  'July' = '07',
  'August' = '08',
  'September' = '09',
  'October' = '10',
  'November' = '11',
  'December' = '12'
}

const months: Array<{ key: number; value: string }> = [
  { key: 0, value: 'January' },
  { key: 1, value: 'February' },
  { key: 2, value: 'March' },
  { key: 3, value: 'April' },
  { key: 4, value: 'May' },
  { key: 5, value: 'June' },
  { key: 6, value: 'July' },
  { key: 7, value: 'August' },
  { key: 8, value: 'September' },
  { key: 9, value: 'October' },
  { key: 10, value: 'November' },
  { key: 11, value: 'December' }
];

const MonthName = {
  fullMonthNames: {
    1: 'calendar_month_January',
    2: 'calendar_month_February',
    3: 'calendar_month_March',
    4: 'calendar_month_April',
    5: 'calendar_month_May',
    6: 'calendar_month_June',
    7: 'calendar_month_July',
    8: 'calendar_month_August',
    9: 'calendar_month_September',
    10: 'calendar_month_October',
    11: 'calendar_month_November',
    12: 'calendar_month_December'
  },
  shortMonthNames: [
    'calendar_short_month_Jan',
    'calendar_short_month_Feb',
    'calendar_short_month_Mar',
    'calendar_short_month_Apr',
    'calendar_short_month_May',
    'calendar_short_month_Jun',
    'calendar_short_month_Jul',
    'calendar_short_month_Aug',
    'calendar_short_month_Sep',
    'calendar_short_month_Oct',
    'calendar_short_month_Nov',
    'calendar_short_month_Dec'
  ]
};

class DateFormat {
  public static fullDate = 1;
  public static onlyDate = 2;
  public static onlyTime = 3;
  public static onlyDay = 4;
  public static onlyMonth = 5;
  public static onlyYear = 6;
  public static fullDateHistory = 7;
  public static fullValidation = 8;
  public static freebetDate = 9;
  public static onlyDateWithWords = 10;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private YEARS_TO_DISPLAY = 100;
  private YEAR_GAP = 18;
  private yesterday = DateUtils.substract(1, DateUtils.DAYS);
  private days = this.yesterday.getDate();
  private months = this.yesterday.getMonth() + 1;
  private currYear = this.yesterday.getFullYear();
  private maxValidYear = this.currYear - 18;
  private minValidYear = this.maxValidYear - 100;
  private maxDaysPerMonth = 31;
  private validYear = this.currYear - 19;
  private maxMonthsPerYear = 12;

  DEFAULT_YEAR = 2003;
  dateFormat = DateFormat;
  monthNames = MonthName.fullMonthNames;

  constructor(private readonly languageFacade: LanguageFacade) {}

  public monthToIndex(month: { key: number; value: string }): number {
    return months.findIndex((m) => m.key === month.key);
  }

  public getDaysInMonth(
    month: { key: number; value: string },
    year: { key: number; value: number }
  ): number {
    return new Date(year.key, this.monthToIndex(month) + 1, 0).getDate();
  }

  public getValidDays(
    month: { key: number; value: string } = { key: -1, value: '' },
    year: { key: number; value: number } = {
      key: this.DEFAULT_YEAR,
      value: this.DEFAULT_YEAR
    }
  ): Array<{ key: string; value: string }> {
    let validDayNum = 0;
    if (month.key !== -1) {
      validDayNum = this.getDaysInMonth(month, year);
    } else {
      validDayNum = 31;
    }

    const validDays: Array<{ key: string; value: string }> = [];
    for (let i = 1; i <= validDayNum; i++) {
      if (i < 10) {
        validDays.push({ key: '0' + i, value: '0' + i });
      } else {
        validDays.push({ key: i.toString(10), value: i.toString(10) });
      }
    }
    return validDays;
  }

  public getValidMonths(
    _months?: Array<{ key: string; value: string }>,
    day: { key: string; value: string } = { key: '', value: '' },
    year: { key: number; value: number } = {
      key: this.DEFAULT_YEAR,
      value: this.DEFAULT_YEAR
    }
  ): Array<{ key: number; value: string }> {
    const monthsContainer: any = _months || Months;
    let validMonths;
    if (day.key) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validMonths = monthsContainer.filter((month) => {
        return this.getDaysInMonth(month.key, year) >= Number.parseInt(day.key);
      });
    } else {
      validMonths = months;
    }
    return validMonths;
  }

  public getValidYears(
    day: { key: string; value: string } = { key: '', value: '' },
    month: { key: number; value: string } = {
      key: -1,
      value: ''
    }
  ): Array<{ key: number; value: number }> {
    const currentYear = new Date().getFullYear();

    let validYears: Array<{ key: number; value: number }> = [];
    for (let i = 0; i < this.YEARS_TO_DISPLAY; i++) {
      validYears.push({
        key: currentYear - this.YEAR_GAP - i,
        value: currentYear - this.YEAR_GAP - i
      });
    }

    if (month.key !== -1 && day.key) {
      validYears = validYears.filter(
        (year) => this.getDaysInMonth(month, year) >= Number.parseInt(day.value)
      );
    }

    return validYears;
  }

  public getVariables() {
    return {
      yesterday: this.yesterday,
      days: this.days,
      months: this.months,
      currYear: this.currYear,
      maxValidYear: this.maxValidYear,
      minValidYear: this.minValidYear,
      maxDaysPerMonth: this.maxDaysPerMonth,
      validYear: this.validYear,
      maxMonthsPerYear: this.maxMonthsPerYear
    };
  }

  public getAvailableMonths(maxMonths: number): any[] {
    const changedMonths = [];
    for (let i = 1; i <= maxMonths; i++) {
      changedMonths.push({
        id: '' + i,
        key: '' + i,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: this.languageFacade.translateInstant(this.monthNames[i])
      });
    }
    return changedMonths;
  }

  getAvailableDays(year: number, month: number, days?: number): any[] {
    if (!days) {
      month = month - 1;
      days = this.getDaysInMonth(
        { key: month, value: month.toString() },
        { key: month, value: month }
      );
    }
    const changedDays = [];
    for (let i = 1; i <= days; i++) {
      changedDays.push({ id: i, key: '' + i, value: '' + i });
    }
    return changedDays;
  }

  public getAvailableYears(validYear: number, minValidYear: number): any[] {
    const changedYears = [];
    for (let i = validYear; i > minValidYear; i--) {
      changedYears.push({ id: i, key: '' + i, value: '' + i });
    }
    return changedYears;
  }

  public leftPad(value: number): string {
    if (value < 10) {
      return '0' + value;
    } else {
      return '' + value;
    }
  }
}
