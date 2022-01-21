import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { MenuItem } from '@crc/facade';

@Component({
  selector: 'crc-sidebar-presentation',
  templateUrl: './sidebar-presentation.component.html',
  styleUrls: ['./sidebar-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarPresentationComponent {
  @Input() menuItems!: Array<MenuItem>;
}
