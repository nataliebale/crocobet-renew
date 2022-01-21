import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginBaseComponent } from '@crc/facade';

@Component({
  selector: 'crc-login-header-presentation',
  templateUrl: './header-login-presentation.component.html',
  styleUrls: ['./header-login-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLoginPresentationComponent extends LoginBaseComponent {
  constructor(fb: FormBuilder, cdr: ChangeDetectorRef) {
    super(cdr, fb);
  }
}
