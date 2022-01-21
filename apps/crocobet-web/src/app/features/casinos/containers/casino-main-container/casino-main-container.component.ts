import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CasinoFiltersFacade } from '@crc/facade';

@UntilDestroy()
@Component({
  selector: 'crc-casinos-main-container',
  templateUrl: './casino-main-container.component.html',
  styleUrls: ['./casino-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoMainContainerComponent {
  constructor(private readonly filterFacade: CasinoFiltersFacade) {
    this.filterFacade.resetFilter();
  }
}
