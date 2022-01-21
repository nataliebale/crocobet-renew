import { Injectable } from '@angular/core';
import { StorageService } from '@crc/shared';

@Injectable({
  providedIn: 'root'
})
export class UserService extends StorageService<'isBalanceVisible'> {
  private isBalanceVisible = true;

  setToggleBalanceStateToLocalStorage(isBalanceVisible: boolean) {
    this.set('isBalanceVisible', `${isBalanceVisible}`);
  }

  getToggleBalanceStateFromLocalStorage(): boolean {
    const isBalanceVisible = this.get('isBalanceVisible');
    if (isBalanceVisible === null) {
      this.setToggleBalanceStateToLocalStorage(this.isBalanceVisible);
      return this.isBalanceVisible;
    } else {
      return isBalanceVisible === 'true';
    }
  }
}
