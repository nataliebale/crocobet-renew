import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashiersService } from '../services/cashiers.service';
import { Cashier } from '../entity/cashiers.interface';

@Injectable({ providedIn: 'root' })
export class CashiersFacade {
  constructor(private readonly cashiersService: CashiersService) {}

  getCashiers(): Observable<Cashier[]> {
    return this.cashiersService.getCashiers();
  }
}
