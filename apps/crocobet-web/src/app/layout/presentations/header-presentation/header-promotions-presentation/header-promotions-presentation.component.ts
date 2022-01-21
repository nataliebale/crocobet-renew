import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Promotion } from '@crc/facade';

@Component({
  selector: 'crc-header-promotions-presentation',
  templateUrl: './header-promotions-presentation.component.html',
  styleUrls: ['./header-promotions-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPromotionsPresentationComponent {
  @Input() promotion: Promotion;
}
