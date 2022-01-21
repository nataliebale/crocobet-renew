import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { VerificationNavItem } from '@crc/facade';

@Component({
  selector: 'crc-w-verification-nav',
  templateUrl: './verification-nav.component.html',
  styleUrls: ['./verification-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationNavComponent {
  @Input() verificationNav: VerificationNavItem[];
}
