import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { FormBase } from '@crc/shared';
import { NgSelectItem } from '@crc/components';

@Component({
  selector: 'crc-w-personal-info-form-presentation',
  templateUrl: './personal-info-form-presentation.component.html',
  styleUrls: ['./personal-info-form-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoFormPresentationComponent
  extends FormBase
  implements OnInit {
  @Input() verificationCodeSuccess: boolean;
  @Input() cities: NgSelectItem[];
  @Input() countries: NgSelectItem[];
  @Input() years: NgSelectItem[] = [];
  @Input() months: NgSelectItem[] = [];
  @Input() days: NgSelectItem[] = [];

  @Input() set touched(touched) {
    this.form?.markAllAsTouched();
  }

  constructor(private readonly controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }
}
