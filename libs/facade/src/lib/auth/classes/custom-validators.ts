import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { mapTo, Observable, of, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterFacade } from '../../features/register/facade/register.facade';

type ValueSelectorFn = (control: AbstractControl) => string | null;

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static passport(control: AbstractControl): ValidationErrors | null {
    if (control?.parent) {
      const countryCode = control.parent.get('countryCode')?.value;
      const id = control.parent.get('documentId')?.value;
      const isCountryGeo = countryCode === 'GE';
      const pattern = isCountryGeo ? /^([0-9]){11}$/ : /^[0-9a-zA-Z]*$/;
      return pattern.test(id) ? null : { passportNumber: true };
    }
    return { passportNumber: true };
  }

  static containsValueFrom(controlName: string) {
    return (control: AbstractControl) => {
      const parentControl: AbstractControl | null | undefined =
        control.parent?.get(controlName);
      if (parentControl) {
        const value = control.value.toLowerCase();
        const searchString = parentControl?.value.toLowerCase();

        if (parentControl?.errors?.containsValue) {
          delete parentControl.errors.containsValue;
          parentControl.markAsPristine();
        }

        if (!value?.length || !searchString?.length) {
          return null;
        }

        if (value.includes(searchString) || searchString.includes(value)) {
          return {
            containsValue: true
          };
        }
      }

      return null;
    };
  }

  static mobileNumberLength(control: AbstractControl) {
    if (control?.parent) {
      const countryCode = control.parent.parent?.get('countryCode')?.value;
      const isCountryGeo = countryCode === 'GE';

      if (isCountryGeo) {
        if (control.value.length === 9) {
          return null;
        }
      } else if (control.value.length > 4) {
        return null;
      }
    }
    return { mobileNumberLength: true };
  }

  static createUniqueFieldValidator(registerFacade: RegisterFacade) {
    return (field: string, valueSelectorFn?: ValueSelectorFn) =>
      (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
          mapTo(valueSelectorFn?.(control) || control.value),
          switchMap((value) => {
            return value?.length
              ? registerFacade.checkFieldUniqueness$(field, value)
              : of(null);
          }),
          map((unique) => (unique ? null : { taken: true }))
        );
      };
  }
}
