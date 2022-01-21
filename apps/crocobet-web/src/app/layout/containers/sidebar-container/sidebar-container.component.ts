import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemsFacade, MenuItem } from '@crc/facade';

@Component({
  selector: 'crc-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarContainerComponent {
  menuItems: Array<MenuItem> = this.menuItemsFacade.getMenuItems();
  constructor(private menuItemsFacade: MenuItemsFacade) {}
}
