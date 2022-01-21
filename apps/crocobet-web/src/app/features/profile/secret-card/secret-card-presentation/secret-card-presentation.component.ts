import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'crc-secret-card-presentation',
  templateUrl: './secret-card-presentation.component.html',
  styleUrls: ['./secret-card-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecretCardPresentationComponent {
  @Input() iframeUrl: string;
  @Input() loading: boolean;
}
