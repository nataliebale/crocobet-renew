import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginBaseComponent } from '@crc/facade';

@Component({
  selector: 'crc-w-login-large-view-presentation',
  templateUrl: './login-large-view-presentation.component.html',
  styleUrls: ['./login-large-view-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginLargeViewPresentationComponent extends LoginBaseComponent {
  @Output() register$: EventEmitter<void> = new EventEmitter<void>();

  constructor(fb: FormBuilder, cdr: ChangeDetectorRef) {
    super(cdr, fb);
  }

  onRegister() {
    this.register$.emit();
  }
}
