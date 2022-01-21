import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'crc-w-deposit-pay-presentation',
  templateUrl: './deposit-pay-presentation.component.html',
  styleUrls: ['./deposit-pay-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPayPresentationComponent {
  @Input() iframeUrl: string;
}
