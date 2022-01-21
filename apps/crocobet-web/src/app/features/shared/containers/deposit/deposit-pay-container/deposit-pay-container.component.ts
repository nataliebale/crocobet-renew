import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'crc-w-deposit-pay-container',
  templateUrl: './deposit-pay-container.component.html',
  styleUrls: ['./deposit-pay-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPayContainerComponent {
  @Input() iframeUrl: string;
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  onClosePopup() {
    this.closePopup.emit();
  }
}
