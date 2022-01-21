import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

type MatchControlsValidatorCallback = (
  formControls: FormGroup
) => ValidationErrors | null;

export const matchControlsValidator = (
  controlName: string,
  matchingControlName: string
): MatchControlsValidatorCallback => {
  return (formControls: FormGroup): ValidationErrors => {
    const controlsList = formControls.controls;
    const control: AbstractControl = controlsList[controlName];
    const matchingControl: AbstractControl = controlsList[matchingControlName];
    if (!matchingControl.value) {
      return null;
    }
    if (!control.value || control.value !== matchingControl.value) {
      matchingControl.setErrors({ match: true });
      return { match: true };
    }
    matchingControl.setErrors(null);
    return null;
  };
};
