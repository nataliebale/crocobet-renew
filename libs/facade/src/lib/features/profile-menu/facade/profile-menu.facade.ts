import { Injectable } from '@angular/core';
import { ProfileMenuItem } from '../entity/profile-menu.interface';
import { PROFILE_MENU_ITEMS } from '../constants/profile-menu';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuFacade {
  private readonly profileMenuItems: ProfileMenuItem[] = PROFILE_MENU_ITEMS;

  getProfileMenuItems(): ProfileMenuItem[] {
    return this.profileMenuItems;
  }
}
