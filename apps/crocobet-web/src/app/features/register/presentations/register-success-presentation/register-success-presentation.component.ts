import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'crc-w-register-success-presentation',
  templateUrl: './register-success-presentation.component.html',
  styleUrls: ['./register-success-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterSuccessPresentationComponent {
  @Output() verify$: EventEmitter<void> = new EventEmitter<void>();

  onVerify() {
    this.verify$.emit();
  }
}
