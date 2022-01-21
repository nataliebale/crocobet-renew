import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserMenuItems } from '../models/user-menu';
import { ListItem } from '../entity/list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  setToggleBalanceState(isBalanceVisible: boolean) {
    this.userService.setToggleBalanceStateToLocalStorage(isBalanceVisible);
  }

  getToggleBalanceState(): boolean {
    return this.userService.getToggleBalanceStateFromLocalStorage();
  }

  getUserMenuItems(): ListItem[] {
    return UserMenuItems;
  }
}
