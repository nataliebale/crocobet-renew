import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BannerInfo } from './banner-info';

@Component({
  selector: 'crc-shared-banner-presentation',
  templateUrl: './shared-banner-presentation.component.html',
  styleUrls: ['./shared-banner-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedBannerPresentationComponent {
  @Input() banners: BannerInfo[];
}
