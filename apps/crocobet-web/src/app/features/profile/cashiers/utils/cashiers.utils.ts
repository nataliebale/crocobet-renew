import { Cashier, CashierHours, CashierPlace } from '@crc/facade';
import { HolidayTypes } from '../entity/holiday.enum';
import { CashierWeekdays } from '../entity/weekday.enum';
import { OpenStatus } from '../entity/open-status.enum';

const checkAddress = (
  cashierPlace: CashierPlace,
  cashierName: string
): boolean => {
  return !cashierName || cashierPlace.address.includes(cashierName);
};

const checkHours = (
  cashierPlace: CashierPlace,
  isAlwaysOpen = false
): boolean => {
  return !isAlwaysOpen || cashierPlace.t13n;
};

const filterCashierPlaces = (
  cashier: Cashier,
  cashierName: string,
  isAlwaysOpen = false
): CashierPlace[] => {
  if (cashier.name.includes(cashierName)) {
    return cashier.places.filter((place: CashierPlace) =>
      checkHours(place, isAlwaysOpen)
    );
  }

  return cashier.places.filter(
    (place: CashierPlace) =>
      checkAddress(place, cashierName) && checkHours(place, isAlwaysOpen)
  );
};

const isDayHoliday = (weekday: number, cashier: CashierPlace): boolean => {
  const hours = cashier.openHours.find((hr) => hr.weekday === weekday);
  return !cashier.t13n && hours && hours.closed;
};

const getOpenHours = (cashier: CashierPlace): CashierHours => {
  const weekday = new Date().getDay();
  const openHours = cashier.openHours.find((item) => item.weekday === weekday);

  if (openHours) {
    return openHours;
  }
  return cashier.openHours.find(
    (item) => item.weekday === CashierWeekdays.AllWeek
  );
};

const minutesFromTimestamp = (str: string): number => {
  const [hours, minutes] = str.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const getCashierStateByDate = (openHours: CashierHours): OpenStatus => {
  const now = new Date();
  const mNow = now.getHours() * 60 + now.getMinutes();
  const mFrom = minutesFromTimestamp(openHours.from);
  const mUntil = minutesFromTimestamp(openHours.until);
  const dFrom = mNow - mFrom;
  let dUntil = mUntil - mNow;

  if (dUntil < 0 && mUntil < mFrom) {
    dUntil = 24 * 60 + dUntil;
  }
  if (dFrom > 0 && dUntil > 0) {
    if (dUntil < 30) {
      return OpenStatus.ClosesSoon;
    } else {
      return OpenStatus.Open;
    }
  } else {
    return OpenStatus.Closed;
  }
};

export const filterCashiers = (
  cashiers: Cashier[],
  cashierName: string,
  isAlwaysOpen = false
): Cashier[] => {
  return cashiers.map((cashier: Cashier) => ({
    ...cashier,
    places: filterCashierPlaces(cashier, cashierName, isAlwaysOpen)
  }));
};

export const cashiersMatch = (
  cashier1: CashierPlace,
  cashier2: CashierPlace
): boolean => {
  const cashiersExist = cashier1 && cashier2;
  const latMatches =
    cashiersExist && cashier1.coordinates.lat === cashier2.coordinates.lat;
  const lngMatches =
    cashiersExist && cashier1.coordinates.lon === cashier2.coordinates.lon;
  const sameNames = cashiersExist && cashier1.address === cashier2.address;
  return latMatches && lngMatches && sameNames;
};

export const getHolidayType = (cashier: CashierPlace): HolidayTypes => {
  const isSaturdayHoliday = isDayHoliday(CashierWeekdays.Saturday, cashier);
  const isSundayHoliday = isDayHoliday(CashierWeekdays.Sunday, cashier);

  if (isSundayHoliday && isSaturdayHoliday) {
    return HolidayTypes.Weekend;
  } else if (isSaturdayHoliday) {
    return HolidayTypes.Saturday;
  } else if (isSundayHoliday) {
    return HolidayTypes.Sunday;
  } else {
    return HolidayTypes.None;
  }
};

export const getException = (cashier: CashierPlace): CashierWeekdays => {
  const exception = cashier.openHours.find(
    (hr) => hr.weekday !== CashierWeekdays.AllWeek && !hr.closed
  );

  return exception ? exception.weekday : null;
};

export const getCashierState = (cashier: CashierPlace): OpenStatus => {
  const openHours: CashierHours = getOpenHours(cashier);

  if (cashier.t13n) {
    return OpenStatus.Open;
  } else if (openHours === null) {
    return OpenStatus.Closed;
  } else {
    return getCashierStateByDate(openHours);
  }
};

export const getMinutesBeforeClosing = (cashier: CashierPlace): string => {
  const openHours: CashierHours = getOpenHours(cashier);
  const now = new Date();
  const mNow = now.getHours() * 60 + now.getMinutes();
  const mFrom = minutesFromTimestamp(openHours.from);
  const mUntil = minutesFromTimestamp(openHours.until);
  let dUntil = mUntil - mNow;

  if (dUntil < 0 && mUntil < mFrom) {
    dUntil = 24 * 60 + dUntil;
  }
  return `${Math.floor(dUntil % 60)}`;
};
