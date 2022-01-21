import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { delay, take, tap } from 'rxjs';
import { Transaction, TransactionsFacade } from '@crc/facade';
import { formatDate } from '@angular/common';

@Component({
  selector: 'crc-transactions-history-container',
  templateUrl: './transactions-history-container.component.html',
  styleUrls: ['./transactions-history-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryContainerComponent implements OnInit {
  transactions: Transaction[] = [];
  dateFrom: string;
  dateTo: string;
  amount = 21;
  offset = 0;
  loading = true;

  constructor(
    private readonly facade: TransactionsFacade,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.initializeStartingDates();
  }

  private getTransactionsRequest() {
    this.facade.getRequest(
      this.dateFrom,
      this.dateTo,
      this.amount,
      this.offset
    );
  }

  ngOnInit() {
    this.facade
      .getTransactions()
      .pipe(
        take(1),
        delay(500),
        tap((_) => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
    this.subscribeToTransactions();

    this.getTransactionsRequest();
  }

  onScroll() {
    this.offset += 20;
    this.getTransactionsRequest();
  }

  private subscribeToTransactions() {
    this.facade
      .getTransactions()
      .pipe(
        tap((items) => {
          if (items) {
            this.transactions = [...this.transactions, ...items];
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  initializeStartingDates() {
    const startingDates = this.startDates();
    this.dateFrom = startingDates[0];
    this.dateTo = startingDates[1];
  }

  startDates(): string[] {
    const dateFrom = new Date();
    const dateTo = new Date();
    dateFrom.setHours(dateFrom.getHours() - 24);
    const _dateFrom = formatDate(dateFrom, 'yyyy-MM-dd', 'en_US');
    const _dateTo = formatDate(dateTo, 'yyyy-MM-dd', 'en_US');
    return [_dateFrom, _dateTo];
  }
}
