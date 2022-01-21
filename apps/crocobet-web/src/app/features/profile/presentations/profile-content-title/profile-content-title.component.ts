import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'crc-w-profile-content-title',
  templateUrl: './profile-content-title.component.html',
  styleUrls: ['./profile-content-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileContentTitleComponent {
  @Input() title: string;
}
