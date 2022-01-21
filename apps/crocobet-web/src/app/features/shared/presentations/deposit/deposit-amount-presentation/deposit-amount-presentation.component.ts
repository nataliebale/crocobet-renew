import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { DepositAmount } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-amount-presentation',
  templateUrl: './deposit-amount-presentation.component.html',
  styleUrls: ['./deposit-amount-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositAmountPresentationComponent implements OnInit {
  @Input() depositAmounts: DepositAmount[];
  @Input() controlName: string;
  @Input() isDepositButtonVisible: boolean;
  @Input() isFastDeposit: boolean;

  @Output() openDepositPopup: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(private readonly controlContainer: ControlContainer) {}

  get amountValue(): number {
    return Number(this.form.get(this.controlName).value);
  }

  get amountControl(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  onSetAmount(amount: number) {
    this.form.get(this.controlName).setValue(amount);
  }

  onOpenDepositPopup() {
    if (this.amountControl.valid) {
      this.openDepositPopup.emit();
    }
  }
}
