import { NgSelectItem } from '@crc/components';

export const sortFn = (accessFunction): ((a, b) => number) => {
  return (a, b) => {
    if (accessFunction(a) > accessFunction(b)) {
      return 1;
    }
    if (accessFunction(a) < accessFunction(b)) {
      return -1;
    }
    return 0;
  };
};

export const appendCountryFlag = (
  item: NgSelectItem,
  iconFn: (name: string) => string
): NgSelectItem => {
  return {
    ...item,
    icon: `/assets/icons/flags/${iconFn(item.key)}`
  };
};

export const addLeadingZero = (str: string): string => {
  return (str.length === 1 ? '0' : '') + str;
};

export const phoneCodeIsGE = (code): boolean => {
  return code === '995';
};
