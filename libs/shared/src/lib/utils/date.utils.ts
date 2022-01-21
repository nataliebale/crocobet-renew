type DateUnit = 'DAYS' | 'MONTHS' | 'YEARS';

export class DateUtils {
  public static DAYS: 'DAYS' = 'DAYS';
  public static MONTHS: 'MONTHS' = 'MONTHS';
  public static YEARS: 'YEARS' = 'YEARS';

  static substract(amount: number, unit: DateUnit, date = new Date()): Date {
    const clone = new Date(date);

    switch (unit) {
      case DateUtils.DAYS: {
        clone.setDate(clone.getDate() - amount);
        break;
      }
      case DateUtils.MONTHS: {
        clone.setMonth(clone.getMonth() - amount);
        break;
      }
      case DateUtils.YEARS: {
        clone.setMonth(clone.getMonth() - amount * 12);
        break;
      }
      default: {
        throw Error('Invalid DateUnit: ' + unit);
      }
    }

    return clone;
  }

  /**
   * Returns true if `d1` is greater than `d2`
   * @param d1 LHS value
   * @param d2 RHS value
   */
  public static gt(d1: Date, d2: Date): boolean {
    return d1.getTime() > d2.getTime();
  }

  /**
   * Returns true if `d1` is less than `d2`
   * @param d1 LHS value
   * @param d2 RHS value
   */
  static lt(d1: Date, d2: Date): boolean {
    return d1.getTime() < d2.getTime();
  }

  static format(format: string, date = new Date()): string {
    if (format !== 'yyyy-MM-dd') {
      console.warn(
        '[DateUtils.format > NOT_IMPLEMENTED]: argument "format" with value "' +
          format +
          '" is ignored.'
      );
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
      2,
      '0'
    )}`;
  }

  static makeFormatter(format: string): (date: Date) => string {
    return function formatter(date: Date) {
      return DateUtils.format(format, date);
    };
  }
}
