import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ControlValueTypes } from '../../types';

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;

@Directive()
export abstract class InputBaseComponent<T extends ControlValueTypes>
  implements ControlValueAccessor {
  @Input() formControlName: string;

  @Output() keyUpped: EventEmitter<Event> = new EventEmitter();
  @Output() focused: EventEmitter<Event> = new EventEmitter();

  value: T;
  onChange: OnChangeFn<T>;
  onTouched: OnTouchedFn;
  disabled = false;
  control: FormControl;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    public ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
    this.control = ngControl.control as FormControl;
  }

  registerOnChange(fn: OnChangeFn<T>) {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(value: T) {
    this.value = value;
    this.cdr.markForCheck();
  }
}
