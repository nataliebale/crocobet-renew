import { Injectable } from '@angular/core';

import { MENU_ITEMS } from '../constants/menu-items';
import { MenuItem } from '../entity/menu-items.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsFacade {
  private readonly menuItems: Array<MenuItem> = MENU_ITEMS;

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}
