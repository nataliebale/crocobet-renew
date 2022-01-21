import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  TransactionCurrencies,
  TRANSACTIONS_SELECT_ITEMS,
  TransactionsStatus
} from '@crc/facade';
import { isToday } from '@crc/shared';
@Component({
  selector: 'crc-transactions-history-presentation',
  templateUrl: './transactions-history-presentation.component.html',
  styleUrls: ['./transactions-history-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryPresentationComponent {
  @Input() transactions: any[];
  @Output() scrollEmitted = new EventEmitter<MouseEvent>();
  @Input() loading: boolean;

  transactionSelectItems = TRANSACTIONS_SELECT_ITEMS;
  transactionsStatus = TransactionsStatus;
  transactionsCurrencies = TransactionCurrencies;
  selectedTransaction = 1;

  isToday(date: Date): boolean {
    return isToday(date);
  }
}
