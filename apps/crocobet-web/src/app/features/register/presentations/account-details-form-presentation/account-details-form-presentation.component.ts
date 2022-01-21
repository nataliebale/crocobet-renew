import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { FormBase } from '@crc/shared';

@Component({
  selector: 'crc-w-account-details-form-presentation',
  templateUrl: './account-details-form-presentation.component.html',
  styleUrls: ['./account-details-form-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsFormPresentationComponent
  extends FormBase
  implements OnInit {
  @Input() verificationCodeSuccess: boolean;
  @Input() invalidStatus: boolean;

  @Output() checkDocumentId$: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly controlContainer: ControlContainer) {
    super();
  }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  onCheckDocumentId() {
    this.checkDocumentId$.emit();
  }
}
