import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Directive()
export class FormBase {
  form: FormGroup;

  private getFormControl(name: string): AbstractControl {
    return this.form.get(name);
  }

  controlHasErrors(
    controlName: string,
    withoutDirtyAndTouched = false
  ): boolean | ValidationErrors {
    const control: AbstractControl = this.getFormControl(controlName);
    if (withoutDirtyAndTouched) {
      return control.errors;
    }
    return this.getControlDirtyAndTouched(controlName) && control.errors;
  }

  getControlDirtyAndTouched(controlName: string): boolean {
    return (
      this.getFormControl(controlName).dirty &&
      this.getFormControl(controlName).touched
    );
  }
}
