import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { DepositAmountConstant } from '@crc/facade';

@UntilDestroy()
@Component({
  selector: 'crc-w-deposit-amount-container',
  templateUrl: './deposit-amount-container.component.html',
  styleUrls: ['./deposit-amount-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositAmountContainerComponent {
  @Input() controlName: string;
  @Input() isDepositButtonVisible: boolean;
  @Input() isFastDeposit: boolean;

  @Output() openDepositPopup: EventEmitter<void> = new EventEmitter<void>();

  depositAmounts = DepositAmountConstant;
  control: FormControl;

  onOpenDepositPopup() {
    this.openDepositPopup.emit();
  }
}
