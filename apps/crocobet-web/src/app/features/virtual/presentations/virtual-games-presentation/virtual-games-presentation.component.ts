import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Virtual } from '@crc/facade';

@Component({
  selector: 'crc-w-virtual-games-presentation',
  templateUrl: './virtual-games-presentation.component.html',
  styleUrls: ['./virtual-games-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualGamesPresentationComponent {
  @Input() virtualGameItems: Virtual[];
  @Input() virtualGameFirstElem: Virtual[];
}
