import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'crc-w-reset-password-status-presentation',
  templateUrl: './reset-password-status-presentation.component.html',
  styleUrls: ['./reset-password-status-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordStatusPresentationComponent {
  @Input() success: boolean;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  onCloseDialog() {
    this.closeDialog.emit();
  }
}
