import { formatDate } from '@angular/common';

export function getToday(): Date {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );
}

export function getTomorrow(): Date {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
    0,
    0,
    0,
    0
  );
}

export function isToday(date: Date): boolean {
  const formattedDate = formatDate(new Date(date), 'yyyy-MM-dd', 'en_US');
  const today = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  return formattedDate === today;
}

export function isDate(date: string): boolean {
  return !Array.isArray(date) && isNaN(Number(date)) && !!Date.parse(date);
}

export function parseExactDate(dateString: string): Date {
  const dateParts = dateString.split('T')[0].split('-');
  return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2], 0, 0, 0);
}

export function dayCountDueTo(date: string): number {
  return Math.floor(
    (new Date(date).getTime() - getToday().getTime()) / dayInMilliseconds
  );
}

export function timeLeftDueTo(date: string): number {
  return Math.floor(
    removeTimeZone(new Date(date)).getTime() - new Date().getTime()
  );
}

export function removeTimeZone(date: Date) {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}

export function isNumber(val: number): boolean {
  return typeof !isNaN(val) && typeof val === 'number';
}

const minuteInMilliseconds = 1000 * 60;
const hourInMilliseconds = minuteInMilliseconds * 60;
const dayInMilliseconds = hourInMilliseconds * 24;
