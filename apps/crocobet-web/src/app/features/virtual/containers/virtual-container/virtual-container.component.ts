import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  BETRADAR_CATS,
  BETRADAR_FIRST,
  GOLDEN_RACE_CAT,
  GOLDEN_RACE_FIRST,
  Virtual
} from '@crc/facade';

@Component({
  selector: 'crc-w-virtual-container',
  templateUrl: './virtual-container.component.html',
  styleUrls: ['./virtual-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualContainerComponent {
  betradarItems: Virtual[] = BETRADAR_CATS;
  betradarFirstElem: Virtual[] = BETRADAR_FIRST;
  goldenRaceItems: Virtual[] = GOLDEN_RACE_CAT;
  goldenRaceFirstElem: Virtual[] = GOLDEN_RACE_FIRST;
}
