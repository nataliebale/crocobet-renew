import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SlotsFiltersFacade } from '@crc/facade';

@UntilDestroy()
@Component({
  selector: 'crc-slots-main-container',
  templateUrl: './slots-main-container.component.html',
  styleUrls: ['./slots-main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotsMainContainerComponent {
  constructor(private readonly slotsFiltersFacade: SlotsFiltersFacade) {
    slotsFiltersFacade.resetFilter();
  }
}
