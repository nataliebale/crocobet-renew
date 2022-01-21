import { DropdownValue } from '../types';

export class DropdownItem {
  value: DropdownValue;
  label: string;
}

export function createDropDownItem<T>(
  entity: T,
  keys: { value: keyof T; label: keyof T }
): DropdownItem {
  return {
    value: entity[keys.value],
    label: entity[keys.label]
  } as unknown as DropdownItem;
}
