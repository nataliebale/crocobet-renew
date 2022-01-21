import { AbstractControl } from '@angular/forms';

export const selectPhoneNumber = (group: AbstractControl): string => {
  const code = group.get('code').value;
  const value = group.get('value').value;
  return `${code}:${value}`;
};

export const selectPhoneNumberFromChild = (
  control: AbstractControl
): string | null => {
  if (control.parent) {
    return selectPhoneNumber(control.parent);
  } else {
    return null;
  }
};
