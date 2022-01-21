import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import { Transaction } from '../entity/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsFacade {
  private subject = new Subject<Transaction[]>();

  constructor(private readonly transactionsService: TransactionsService) {}

  getRequest(dateFrom: string, dateTo: string, amount: number, offSet: number) {
    this.transactionsService
      .getRequest(dateFrom, dateTo, amount, offSet)
      .pipe(
        tap((response) => {
          this.subject.next(response.data);
        })
      )
      .subscribe();
  }

  getTransactions(): Observable<Transaction[]> {
    return this.subject.asObservable();
  }
}
