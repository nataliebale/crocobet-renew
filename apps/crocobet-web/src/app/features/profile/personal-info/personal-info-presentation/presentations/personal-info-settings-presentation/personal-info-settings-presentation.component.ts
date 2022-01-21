import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PersonalData } from '@crc/facade';
import { NgSelectItem } from '@crc/components';

@Component({
  selector: 'crc-w-personal-info-settings-presentation',
  templateUrl: './personal-info-settings-presentation.component.html',
  styleUrls: ['./personal-info-settings-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoSettingsPresentationComponent {
  @Input() personalData: PersonalData;
  @Input() cities: NgSelectItem[];
  @Input() countries: NgSelectItem[];
}
