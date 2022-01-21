import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { BankProvider, PaymentForm } from '@crc/facade';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
  selector: 'crc-w-deposit-popup-presentation',
  templateUrl: './deposit-popup-presentation.component.html',
  styleUrls: ['./deposit-popup-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class DepositPopupPresentationComponent implements OnInit {
  @Input() providerList: BankProvider[];
  @Input() currentLanguage: string;
  @Input() paymentAmount: number;

  @Output() processPayment: EventEmitter<PaymentForm> =
    new EventEmitter<PaymentForm>();
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  paymentForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      providerId: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(20000)
      ]),
      transactionAmount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ]),
      activateCard: new FormControl(true, [Validators.required])
    });
  }

  get providerId() {
    return this.paymentForm.get('providerId').value;
  }

  ngOnInit() {
    if (this.paymentAmount) {
      this.paymentForm.controls['transactionAmount'].setValue(
        this.paymentAmount
      );
    }
  }

  onProcessPaymentClick() {
    this.processPayment.emit(this.paymentForm.value);
  }

  emitClosePopup() {
    this.closePopup.emit();
  }
}
