import { TransactionSelect } from '../entity/transactions.interface';
import { generateTransactionsSelectMenuItems } from '../functions/functions';

export const TRANSACTIONS_SELECT_ITEMS: TransactionSelect[] = [
  generateTransactionsSelectMenuItems(1, 'ყველა'),
  generateTransactionsSelectMenuItems(2, 'ტრანზაქციები'),
  generateTransactionsSelectMenuItems(3, 'თამაშები')
];
