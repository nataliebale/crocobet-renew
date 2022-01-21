import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PromotionFacade } from '@crc/facade';
import { Promotion } from '@crc/facade';

@Component({
  selector: 'crc-header-promotions-container',
  templateUrl: './header-promotions-container.component.html',
  styleUrls: ['./header-promotions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPromotionsContainerComponent {
  promotion$: Observable<Promotion> = this.promotionFacade.promotion$;

  constructor(private readonly promotionFacade: PromotionFacade) {}
}
